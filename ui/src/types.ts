import Decimal from "decimal.js";

type Eyecatch = {
  url: string;
  height: number;
  width: number;
};

export type NewsItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content?: string;
  eyecatch?: Eyecatch;
  category: null;
};


export type NewsItemList = NewsItem[];

export type VerifierInputs = {
  vk: string;
  public_inputs: string;
  proof_points: string;
};

export type Vault = {
  protocol: string;
  syAssetType: string;
  principalAssetType: string;
  maturity: Date;
  maturityCode: string;
  longYieldAPY: Decimal;
  ytPrice: Decimal;
  fixedAPY: Decimal;
  ptPrice: Decimal;
  underlyingAPY: Decimal;
  underlyingAssetPrice: Decimal;
  impliedAPY: Decimal;
};
