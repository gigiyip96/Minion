import React, { useState } from 'react';
import TradingPairModal from './TradingPairModal';

interface TradingPair {
  pair: string;
  change: number;
  apy: number;
  tvl: string;
  source: string;
  volume24h: string;
}

const tradingPairs: TradingPair[] = [
  {
    pair: 'DOGE/USDC',
    change: 5.2,
    apy: 12.5,
    tvl: '$1.2M',
    source: 'Uniswap',
    volume24h: '$500K',
  },
  {
    pair: 'SHIB/USDC',
    change: -2.1,
    apy: 8.7,
    tvl: '$800K',
    source: 'PancakeSwap',
    volume24h: '$300K',
  },
  {
    pair: 'PEPE/USDC',
    change: 10.5,
    apy: 15.3,
    tvl: '$500K',
    source: 'SushiSwap',
    volume24h: '$250K',
  },
  {
    pair: 'DOGE/USDC',
    change: 5.2,
    apy: 12.5,
    tvl: '$1.2M',
    source: 'Uniswap',
    volume24h: '$500K',
  },
  {
    pair: 'SHIB/USDC',
    change: -2.1,
    apy: 8.7,
    tvl: '$800K',
    source: 'PancakeSwap',
    volume24h: '$300K',
  },
  {
    pair: 'PEPE/USDC',
    change: 10.5,
    apy: 15.3,
    tvl: '$500K',
    source: 'SushiSwap',
    volume24h: '$250K',
  },
  // 可以添加更多交易对来测试滚动效果
];

const TradingPanel: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);

  return (
    <>
      <div className="flex flex-col w-full h-full bg-purple-50 bg-opacity-30 rounded-xl overflow-hidden">
        <div className="flex-grow overflow-y-auto">
          <div className="space-y-4 p-4">
            {tradingPairs.map((pair, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedPair(pair)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-purple-800">{pair.pair}</h3>
                  <span className={`text-lg font-bold ${pair.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {pair.change >= 0 ? '+' : ''}{pair.change}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-purple-600">APY:</p>
                    <p className="font-bold text-purple-800">{pair.apy}%</p>
                  </div>
                  <div>
                    <p className="text-purple-600">TVL:</p>
                    <p className="font-bold text-purple-800">{pair.tvl}</p>
                  </div>
                  <div>
                    <p className="text-purple-600">Source:</p>
                    <p className="font-medium text-purple-700">{pair.source}</p>
                  </div>
                  <div>
                    <p className="text-purple-600">24h Vol:</p>
                    <p className="font-bold text-purple-800">{pair.volume24h}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedPair && (
        <TradingPairModal
          pair={{
            name: selectedPair.pair,
            price: '$0.065',
            change: `${selectedPair.change >= 0 ? '+' : ''}${selectedPair.change}% (24h)`,
            apy: `${selectedPair.apy}%`,
            tvl: selectedPair.tvl,
            volume24h: selectedPair.volume24h,
            riskScore: '7.5/10',
          }}
          onClose={() => setSelectedPair(null)}
        />
      )}
    </>
  );
};

export default TradingPanel;
