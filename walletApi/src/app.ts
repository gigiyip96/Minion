import express from 'express';
import cors from 'cors';
import walletRoutes from './route/walletRoutes';

const app = express();
const port = 8080;

// 配置 CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', walletRoutes);

app.listen(port, () => {
  console.log(process.env.CIRCLE_API_KEY, process.env.ENTITY_SECRET);
  console.log(`Server is running at http://localhost:${port}`);
});