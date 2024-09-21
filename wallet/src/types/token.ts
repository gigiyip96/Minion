export interface Token {
  id: string;
  blockchain: string;
  tokenAddress: string;
  standard: string;
  name: string;
  symbol: string;
  decimals: number;
  isNative: boolean;
  updateDate: string;
  createDate: string;
}

export interface TokenBalance {
  token: Token;
  amount: string;
  updateDate: string;
}

export interface TokenDisplayProps {
  tokenBalances: TokenBalance[];
}