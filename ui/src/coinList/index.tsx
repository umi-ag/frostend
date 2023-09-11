import { STSUI_PTCoinType, STSUI_SYCoinType, STSUI_YTCoinType } from "src/frostendLib"


export type CoinProfile = {
  coinType: string;
  decimals: number;
  name: string;
  symbol: string;
  description: string;
  iconUrl: string | null;
  id: string;
};

const coinList: CoinProfile[] = [
  {
    id: "",
    name: "Staking SUI",
    symbol: "stSUI",
    description: "",
    iconUrl: '/img/stsui.png',
    coinType: STSUI_SYCoinType,
    decimals: 8,
  },
  {
    id: "",
    name: "PT Staking SUI",
    symbol: "PT-stSUI",
    description: "",
    iconUrl: '/img/stsui.png',
    coinType: STSUI_PTCoinType,
    decimals: 8,
  },
  {
    id: "",
    name: "YT Staking SUI",
    symbol: "YT-stSUI",
    description: "",
    iconUrl: '/img/stsui.png',
    coinType: STSUI_YTCoinType,
    decimals: 8,
  },
];

export const getCoinProfileByCoinType = (coinType: string): CoinProfile | null => {
  return coinList.find((coinProfile) => coinProfile.coinType === coinType) ?? null
}

