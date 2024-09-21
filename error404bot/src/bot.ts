import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN is not set in the environment');
}

const bot = new TelegramBot(token, {polling: true});

const API_BASE_URL = 'http://localhost:8080';

interface WalletResponse {
  // 根据实际响应调整这个接口
  id: string;
  address: string;
}

interface BalanceResponse {
  tokenBalances: {
    token: {
      name: string;
      blockchain: string;
    };
    amount: string;
  }[];
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  bot.sendMessage(chatId, `欢迎使用钱包查询机器人! 您的Telegram ID是: ${userId}\n使用 /wallet 创建或获取您的钱包，使用 /balance 查询余额。`);
});

bot.onText(/\/wallet/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  
  if (!userId) {
    bot.sendMessage(chatId, '无法获取您的用户ID，请重试。');
    return;
  }

  try {
    const response = await axios.post<WalletResponse>(`${API_BASE_URL}/wallets`, { telegramId: userId });
    const walletAddress = response.data.address;
    const walletId = response.data.id;
    bot.sendMessage(chatId, `您的钱包地址是: ${walletAddress}`);
  } catch (error) {
    console.error(`创建/获取钱包时出错:`, error);
    bot.sendMessage(chatId, `创建/获取钱包时出错: ${error instanceof Error ? error.message : '未知错误'}`);
  }
});

bot.onText(/\/balance/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  
  if (!userId) {
    bot.sendMessage(chatId, '无法获取您的用户ID，请重试。');
    return;
  }

  try {
    const response = await axios.get<BalanceResponse>(`${API_BASE_URL}/balance/${userId}`);
    const balances = response.data.tokenBalances;
    let message = "您的钱包余额:\n\n";
    balances.forEach(balance => {
      message += `代币: ${balance.token.name}\n`;
      message += `数量: ${balance.amount}\n`;
      message += `区块链: ${balance.token.blockchain}\n\n`;
    });
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error(`获取余额时出错:`, error);
    bot.sendMessage(chatId, `获取余额时出错: ${error instanceof Error ? error.message : '未知错误'}`);
  }
});

console.log('Bot is running...');
