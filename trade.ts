import { KiteConnect } from "kiteconnect";

const apiKey = "xhb1v3bppise8i4m";
let accessToken = "6Z7k30PjFCKj2O9bW8TyNJmRcWZWgqw6";

const kc = new KiteConnect({ api_key: apiKey });

export async function placeOrder(tradingsymbol:string,quantity:number,type:"BUY" | "SELL") {
  try {
      kc.setAccessToken(accessToken);
     await kc.placeOrder("regular",{
      exchange:"NSE",
      tradingsymbol,
      transaction_type:type,
      quantity,
      product:"CNC",
      order_type:"MARKET",
    });
  } catch (err) {
    console.error(err);
  }
}
