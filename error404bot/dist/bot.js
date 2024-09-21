"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not set in the environment');
}
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const API_BASE_URL = 'http://localhost:8080';
bot.onText(/\/start/, (msg) => {
    var _a;
    const chatId = msg.chat.id;
    const userId = (_a = msg.from) === null || _a === void 0 ? void 0 : _a.id;
    bot.sendMessage(chatId, `欢迎使用钱包查询机器人! 您的Telegram ID是: ${userId}\n使用 /wallet 查询您的钱包地址，使用 /balance 查询余额。`);
});
bot.onText(/\/wallet/, async (msg) => {
    var _a;
    const chatId = msg.chat.id;
    const userId = (_a = msg.from) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        bot.sendMessage(chatId, '无法获取您的用户ID，请重试。');
        return;
    }
    try {
        const response = await axios_1.default.post(`${API_BASE_URL}/wallets/${userId}`);
        console.log(`${API_BASE_URL}/wallets/${userId}`);
        const walletAddress = response.data.address;
        bot.sendMessage(chatId, `您的钱包地址是: ${walletAddress}`);
    }
    catch (error) {
        console.error(`获取钱包地址时出错:`, error);
        bot.sendMessage(chatId, `获取钱包地址时出错: ${error instanceof Error ? error.message : '未知错误'}`);
    }
});
bot.onText(/\/balance/, async (msg) => {
    var _a;
    const chatId = msg.chat.id;
    const userId = (_a = msg.from) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        bot.sendMessage(chatId, '无法获取您的用户ID，请重试。');
        return;
    }
    try {
        const response = await axios_1.default.get(`${API_BASE_URL}/balance/${userId}`);
        const balances = response.data.balances;
        let message = "您的钱包余额:\n\n";
        balances.forEach(balance => {
            message += `${balance.symbol}: ${balance.amount}\n`;
        });
        bot.sendMessage(chatId, message);
    }
    catch (error) {
        console.error(`获取余额时出错:`, error);
        bot.sendMessage(chatId, `获取余额时出错: ${error instanceof Error ? error.message : '未知错误'}`);
    }
});
console.log('Bot is running...');
