import { isPTCoinType, isYTcoinType } from ".";

export const getPTPrice = (coinType: string) => {
  return 0.96;
};

export const getYTPrice = (coinType: string) => {
  return 1 - getPTPrice(coinType);
};

export const getPriceByCoinType = (coinType: string) => {
  return isPTCoinType(coinType)
    ? getPTPrice(coinType)
    : isYTcoinType(coinType)
    ? getYTPrice(coinType)
    : 1;
};
