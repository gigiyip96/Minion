import express from 'express';
import { WalletService } from '../services/wallletServices';

const router = express.Router();
const walletService = new WalletService();

router.post('/wallets', async (req, res) => {
  try {
    const { telegramId } = req.body;
    if (!telegramId ) {
      return res.status(400).json({ error: 'Telegram ID and blockchains are required' });
    }
    const wallets = await walletService.createOrGetWallets(telegramId);
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/balance/:walletId', async (req, res) => {
  try {
    const { walletId } = req.params;
    const balance = await walletService.getWalletBalance(walletId);
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
