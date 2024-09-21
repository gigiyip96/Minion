import { CircleDeveloperControlledWalletsClient, initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import { KVService } from './KVService';

export class WalletService {
  private client: CircleDeveloperControlledWalletsClient;
  private kvService: KVService;
  
  constructor() {
    this.client = initiateDeveloperControlledWalletsClient({
      apiKey: process.env.CIRCLE_API_KEY || 'TEST_API_KEY:6b5d1d7dfc3d044bed914e8ee4c57dc4:2aa4d699ae8dbf0b4b81489f2381c3f9',
      entitySecret: process.env.ENTITY_SECRET || '699869a872f756d9452eb9543bbe35f06ab6ff367af4b1786e28ff5651b1b83c',
    });
    this.kvService = new KVService();
  }

  // create Wallet by TelegramId
  async createOrGetWallets(telegramId: string) {
    try {
      const walletId = await this.kvService.getValue(`user_${telegramId}_wallet`);

      if (walletId) {
        // 如果找到 walletId，直接返回对应的钱包
        const response = await this.client.getWallet({
          id: walletId,
        });
        return response.data?.wallet;
      }

      // If no WalletSet exists, create a new one
      const response = await this.client.createWallets({
        blockchains: ['ETH-SEPOLIA'],
        count: 1,
        walletSetId: process.env.TEST_WALLET_SET_ID || 'e86f76c2-f430-5658-b693-52b1cff2f60c',
      })

      if (response.data?.wallets && response.data.wallets.length > 0) {
        const newWalletId = response.data.wallets[0].id;
        // 将新创建的 walletId 存储到 KV 中
        await this.kvService.setValue(`user_${telegramId}_wallet`, newWalletId);
        return response.data.wallets[0];
      }
      
      return response.data?.wallets;
    } catch (error) {
      console.error('Error in createOrGetWalletSet:', error);
      throw new Error('Failed to create or get wallet set');
    }
  }
  // Get balance for a wallet
  async getWalletBalance(telegramId: string) {
  try {
    const walletId = await this.kvService.getValue(`user_${telegramId}_wallet`);
    
    if (!walletId) {
      throw new Error('Wallet not found for this Telegram ID');
    }

    const response = await this.client.getWalletTokenBalance({
      id: walletId,
      includeAll: true,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error in getWalletBalance:', error);
    throw new Error('Failed to fetch wallet balance');
  }
}
}
