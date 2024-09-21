import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const TokenDisplay: React.FC = () => {
  const { tokenBalances, tokenBalancesLoading, tokenBalancesError } = useSelector((state: RootState) => state.user);

  if (tokenBalancesLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (tokenBalancesError) {
    return (
      <div className="bg-red-400 bg-opacity-30 text-white px-4 py-3 rounded-lg" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {tokenBalancesError}</span>
      </div>
    );
  }

  return (
    <div className="bg-white flex-grow bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden">
      <div className="p-4">
        {tokenBalances.length === 0 ? (
          <p className="text-white text-center">No tokens found in your wallet.</p>
        ) : (
          <div className="space-y-4">
            {tokenBalances.map((tokenBalance, index) => (
              <div key={index} className="bg-white bg-opacity-30 rounded-lg p-4 hover:bg-opacity-40 transition duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg mr-3">
                      {tokenBalance.token.symbol.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-600">{tokenBalance.token.name}</h3>
                      <p className="text-sm text-purple-600">{tokenBalance.token.symbol}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-purple-600">
                    {parseFloat(tokenBalance.amount).toFixed(6)}
                  </p>
                </div>
                <div className="mt-2 inline-block">
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {tokenBalance.token.blockchain}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenDisplay;
