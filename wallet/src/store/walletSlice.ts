import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  wallets: string[]; // 存储钱包 ID
  currentWallet: string | null;
  balance: string | null;
}

const initialState: WalletState = {
  wallets: [],
  currentWallet: null,
  balance: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallets: (state, action: PayloadAction<string[]>) => {
      state.wallets = action.payload;
    },
    setCurrentWallet: (state, action: PayloadAction<string>) => {
      state.currentWallet = action.payload;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
  },
});

export const { setWallets, setCurrentWallet, setBalance } = walletSlice.actions;
export default walletSlice.reducer;
