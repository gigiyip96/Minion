import { TelegramUser } from '@v9v/ts-react-telegram-login';
import crypto from 'crypto';

export function verifyTelegramHash(telegramUser: TelegramUser): boolean {
  const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;
  if (!botToken) {
    console.error('Bot token is not set');
    return false;
  }

  const secret = crypto.createHash('sha256').update(botToken).digest();
  const dataCheckString = Object.keys(telegramUser)
    .filter(key => key !== 'hash')
    .sort()
    .map(key => `${key}=${telegramUser[key as keyof TelegramUser]}`)
    .join('\n');

  const hmac = crypto.createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');

  return hmac === telegramUser.hash;
}
