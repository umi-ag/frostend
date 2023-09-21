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
    name: "Sharbet Staked SUI",
    symbol: "shaSUI",
    description: "Sharbet Staked SUI",
    iconUrl: "/img/coins/shasui.png",
    coinType: STSUI_SYCoinType,
    decimals: 8,
  },
  {
    id: "",
    name: "Princial Token of Sharbet Staked SUI",
    symbol: "PT-shaSUI",
    description: "Princial Token of Sharbet Staked SUI",
    iconUrl: "/img/coins/pt-shasui.png",
    coinType: STSUI_PTCoinType,
    decimals: 8,
  },
  {
    id: "",
    name: "Yield Token of Sharbet Staked SUI",
    symbol: "YT-shaSUI",
    description: "Yield Token of Sharbet Staked SUI",
    iconUrl: "/img/coins/yt-shasui.png",
    coinType: STSUI_YTCoinType,
    decimals: 8,
  },
];

export const getCoinProfileByCoinType = (coinType: string): CoinProfile | null => {
  return coinList.find((coinProfile) => coinProfile.coinType === coinType) ?? null
}

