import { STSUI_PTCoinType, STSUI_SYCoinType, STSUI_YTCoinType } from "src/frostendLib"
import { SHASUI } from "src/moveCall/sharbet/shasui/structs";
import { UNSTSUI } from "src/moveCall/sharbet/unstsui/structs";
import { SUI } from "src/moveCall/sui/sui/structs";


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
    name: "SUI",
    symbol: "SUI",
    description: "SUI",
    iconUrl: "/img/coins/sui.png",
    coinType: SUI.$typeName,
    decimals: 8,
  },
  {
    id: "",
    name: "Sharbet Staked SUI",
    symbol: "shaSUI",
    description: "Sharbet Staked SUI",
    coinType: SHASUI.$typeName,
    iconUrl: "/img/coins/shasui.png",
    decimals: 9,
  },
  {
    id: "",
    name: "Sharbet Unstake Ticket for SUI",
    symbol: "unstSUI",
    description: "Sharbet Unstake Ticket for SUI",
    coinType: UNSTSUI.$typeName,
    iconUrl: "/img/coins/unstsui.png",
    decimals: 9,
  },
  {
    id: "",
    name: "Sharbet Staked SUI",
    symbol: "shaSUI",
    description: "Sharbet Staked SUI",
    coinType: STSUI_SYCoinType,
    iconUrl: "/img/coins/shasui.png",
    decimals: 9,
  },
  {
    id: "",
    name: "Sharbet Staked SUI",
    symbol: "shaSUI",
    description: "Sharbet Staked SUI",
    coinType: STSUI_SYCoinType,
    iconUrl: "/img/coins/shasui.png",
    decimals: 9,
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

