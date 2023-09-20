import { SuiClient } from "@mysten/sui.js/client";

export const suiClient = () => {
  return new SuiClient({
    url: "https://fullnode.testnet.sui.io:443",
  });
};
