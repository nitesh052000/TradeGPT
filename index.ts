import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { placeOrder } from "./trade";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

server.tool("Buy a stock",
  {
    stock: z.string(),
    qty: z.number(), // ❗️ Missing parentheses
  },
  async ({ stock, qty }) => {
    await placeOrder(stock, qty, "BUY"); // ❗️ Use await, and don't wrap it in return directly

    return {
      content: [{ type: "text", text: "Stock has been bought" }],
    };
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);