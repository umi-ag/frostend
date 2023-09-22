import { isPTCoin, isYTCoin } from "src/libs/moveCall/frostend/vault/structs";

export const getPTPrice = (coinType: string) => {
  return 0.96;
};

export const getYTPrice = (coinType: string) => {
  return 1 - getPTPrice(coinType);
};

export const getPriceByCoinType = (coinType: string) => {
  if(isPTCoin(coinType)) return getPTPrice(coinType);
  if (isYTCoin(coinType)) return getYTPrice(coinType);
  return 1
};
