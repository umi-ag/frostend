import { STSUI_PTCoinType, STSUI_SYCoinType, STSUI_YTCoinType } from "src/libs/frostendLib"
import { SHASUI } from "src/libs/moveCall/sharbet/shasui/structs";
import { UNSTSUI } from "src/libs/moveCall/sharbet/unstsui/structs";
import { SUI } from "src/libs/moveCall/sui/sui/structs";
import { ETH } from "src/libs/moveCall/coinhouse/eth/structs";
import { SOL } from "src/libs/moveCall/coinhouse/sol/structs";
import { USDC } from "src/libs/moveCall/coinhouse/usdc/structs";


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
  {
    id: "",
    name: "USD Coin",
    symbol: "USDC",
    description: "USD Coin",
    iconUrl: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    coinType: USDC.$typeName,
    decimals: 8,
  },
  {
    id: "",
    name: "Ethereum",
    symbol: "ETH",
    description: "Ethereum",
    iconUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    coinType: ETH.$typeName,
    decimals: 8,
  },
  {
    id: "",
    name: "Solana Coin",
    symbol: "ETH",
    description: "Solana Coin",
    iconUrl: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    coinType: SOL.$typeName,
    decimals: 8,
  },
  {
    id: "",
    name: "Haedal Staked SUI",
    symbol: "haSUI",
    description: "Sharbet Staked SUI",
    iconUrl: "/img/coins/hasui.png",
    coinType: "0xhasui::hasui::HASUI",
    decimals: 8,
  },
  {
    id: "",
    name: "Volo Staked SUI",
    symbol: "voloSUI",
    description: "Sharbet Staked SUI",
    iconUrl: "/img/coins/volosui.png",
    coinType: "0xvolo::volo::VOLO",
    decimals: 8,
  },
  {
    id: "",
    name: "Scallop Staked SUI",
    symbol: "sSUI",
    description: "Scallop Staked SUI",
    iconUrl: "/img/coins/ssui.png",
    coinType: "0xscallop::scallop::sSUI",
    decimals: 8,
  },
  {
    id: "",
    name: "NAVI Staked SUI",
    symbol: "nSUI",
    description: "NAVI Stake SUI",
    iconUrl: "/img/coins/sui.png",
    coinType: "0xnavi::navi::nSUI",
    decimals: 8,
  },
];

export const getCoinProfileByCoinType = (coinType: string): CoinProfile | null => {
  return coinList.find((coinProfile) => coinProfile.coinType === coinType) ?? null
}

