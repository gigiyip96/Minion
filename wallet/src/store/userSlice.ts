import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TelegramUser } from '@v9v/ts-react-telegram-login';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

interface Token {
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

interface TokenBalance {
  token: Token;
  amount: string;
  updateDate: string;
}

interface Wallet {
  id: string;
  address: string;
}

interface UserState {
  user: TelegramUser | null;
  isLoggedIn: boolean;
  wallet: Wallet | null;
  tokenBalances: TokenBalance[];
  tokenBalancesLoading: boolean;
  tokenBalancesError: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  wallet: null,
  tokenBalances: [],
  tokenBalancesLoading: false,
  tokenBalancesError: null,
};

export const fetchWalletAndBalances = createAsyncThunk(
  'user/fetchWalletAndBalances',
  async (telegramId: string, { rejectWithValue }) => {
    try {
      // 首先获取或创建钱包
      const walletResponse = await axios.post<Wallet>(`${API_BASE_URL}/wallets`, { telegramId });
      const wallet = walletResponse.data;

      // 然后获取余额
      const balanceResponse = await axios.get<{ tokenBalances: TokenBalance[] }>(`${API_BASE_URL}/balance/${telegramId}`);
      const tokenBalances = balanceResponse.data.tokenBalances;

      return { wallet, tokenBalances };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TelegramUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.wallet = null;
      state.tokenBalances = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletAndBalances.pending, (state) => {
        state.tokenBalancesLoading = true;
        state.tokenBalancesError = null;
      })
      .addCase(fetchWalletAndBalances.fulfilled, (state, action) => {
        state.tokenBalancesLoading = false;
        state.wallet = action.payload.wallet;
        state.tokenBalances = action.payload.tokenBalances;
      })
      .addCase(fetchWalletAndBalances.rejected, (state, action) => {
        state.tokenBalancesLoading = false;
        state.tokenBalancesError = action.payload as string;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
