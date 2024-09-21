import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as echarts from 'echarts';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TradingPairModalProps {
  pair: {
    name: string;
    price: string;
    change: string;
    apy: string;
    tvl: string;
    volume24h: string;
    riskScore: string;
  };
  onClose: () => void;
}

const TradingPairModal: React.FC<TradingPairModalProps> = ({ pair, onClose }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        xAxis: {
          type: 'category',
          data: ['May 1', 'May 2', 'May 3', 'May 4', 'May 5'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [0.055, 0.06, 0.056, 0.07, 0.065],
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#8B5CF6',
          },
        }],
      };
      chart.setOption(option);
    }
  }, []);

  const modalContent = (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-800">{pair.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4">
          <span className="text-3xl font-bold text-purple-900">{pair.price}</span>
          <span className={`ml-2 ${pair.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {pair.change}
          </span>
        </div>
        <div ref={chartRef} className="w-full h-48 mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-600">APY</p>
            <p className="text-xl font-bold text-purple-800">{pair.apy}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-600">TVL</p>
            <p className="text-xl font-bold text-purple-800">{pair.tvl}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-600">24h Volume</p>
            <p className="text-xl font-bold text-purple-800">{pair.volume24h}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-600">Risk Score</p>
            <p className="text-xl font-bold text-purple-800">{pair.riskScore}</p>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-purple-800 mb-2">Market Sentiment</h3>
          <p className="text-purple-600">Social Media Mentions: High</p>
          <p className="text-purple-600">Trader Sentiment: <span className="text-green-500">Bullish</span></p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-bold text-purple-800 mb-2">Trade</h3>
          <input
            type="text"
            placeholder="Enter USDC amount"
            className="w-full p-2 mb-2 border border-purple-300 rounded"
          />
          <p className="text-purple-600 mb-2">Estimated DOGE: 1000</p>
          <p className="text-purple-600 mb-2">Slippage: 0.5%</p>
          
          <div className="bg-blue-100 p-3 rounded-lg mb-3 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <p className="text-blue-800">
              Our fees will be donated to <a href="https://freedom.press" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Freedom of the Press Foundation</a> for public welfare.
            </p>
          </div>

          <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors">
            Execute Trade
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default TradingPairModal;
