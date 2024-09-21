"use client";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import TelegramLogin from "./components/TelegramLogin";
import TokenDisplay from "./components/TokenDisplay";
import TradingPanel from "./components/TradingPanel";
import { fetchWalletAndBalances } from '@/store/userSlice';
import { showNotification } from '@/store/notificationSlice';
import { ClipboardIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn, wallet, tokenBalancesLoading } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState('balance');

  useEffect(() => {
    if (isLoggedIn && user) {
      dispatch(fetchWalletAndBalances(user.id.toString()));
    }
  }, [isLoggedIn, user, dispatch]);

  const copyToClipboard = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      dispatch(showNotification({ message: 'Address copied to clipboard', type: 'success' }));
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const SkeletonLoader = () => (
    <div className="w-full space-y-6 animate-pulse">
      <div className="h-8 bg-purple-400 bg-opacity-30 rounded w-3/4"></div>
      <div className="bg-purple-200 bg-opacity-30 p-4 rounded-lg">
        <div className="h-4 bg-purple-500 bg-opacity-50 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-purple-500 bg-opacity-50 rounded w-3/4"></div>
      </div>
      <div className="h-64 bg-purple-500 bg-opacity-30 rounded"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 p-2">
      <div className="flex-grow flex items-center justify-center flex-col max-w-md w-full mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-6">
        {!isLoggedIn && 
          (<div className='flex flex-col space-y-4 gap-4'>
            <TelegramLogin />
            <button
              className="flex items-center justify-center w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <svg className="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512" fill="#FBBC05"></path>
                <path d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88" fill="#EA4335"></path>
                <path d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776" fill="#34A853"></path>
                <path d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667" fill="#4285F4"></path>
              </svg>
              使用 Google 登录
            </button>

            <button
              className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M967.601349 1024c31.076808 0 56.398651-25.321843 56.398651-56.398651V56.398651c0-31.076808-25.321843-56.398651-56.398651-56.398651H56.398651C25.321843 0 0 25.321843 0 56.398651v910.819034c0 31.076808 25.321843 56.398651 56.398651 56.398651h911.202698z" fill="#3C5A99"></path>
                <path d="M706.709629 1024V627.29112h133.13151l19.950543-154.61671h-153.082053V374.072686c0-44.888722 12.277257-75.198202 76.732859-75.198201h81.720494v-138.119146c-14.195579-1.918321-62.920944-6.138629-119.319595-6.138629-118.168602 0-198.738104 72.128887-198.738104 204.109405v113.948295h-133.515174v154.61671h133.515174v396.70888h159.604346z" fill="#FFFFFF"></path>
              </svg>
              使用 Facebook 登录
            </button>

            <button
              className="flex items-center justify-center w-full py-2 px-4 bg-white text-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="icon mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path d="M645.289723 165.758826C677.460161 122.793797 701.865322 62.036894 693.033384 0c-52.607627 3.797306-114.089859 38.61306-149.972271 84.010072-32.682435 41.130375-59.562245 102.313942-49.066319 161.705521 57.514259 1.834654 116.863172-33.834427 151.294929-79.956767zM938.663644 753.402663c-23.295835 52.820959-34.517089 76.415459-64.511543 123.177795-41.855704 65.279538-100.905952 146.644295-174.121433 147.198957-64.980873 0.725328-81.748754-43.30636-169.982796-42.751697-88.234042 0.46933-106.623245 43.605024-171.732117 42.965029-73.130149-0.682662-129.065752-74.026142-170.964122-139.348347-117.11917-182.441374-129.44975-396.626524-57.172928-510.545717 51.327636-80.895427 132.393729-128.212425 208.553189-128.212425 77.482118 0 126.207106 43.519692 190.377318 43.519692 62.292892 0 100.137957-43.647691 189.779989-43.647691 67.839519 0 139.732344 37.802399 190.889315 103.03927-167.678812 94.036667-140.543004 339.069598 28.885128 404.605134z" fill="#0B0B0A"></path>
              </svg>
              使用 Apple ID 登录
            </button>
          </div>)
        }
        {isLoggedIn && (tokenBalancesLoading ? <SkeletonLoader /> : (
          <div className="flex flex-col flex-grow space-y-6 w-full">
            <h2 className="text-2xl font-bold text-purple-800">Welcome, {user?.first_name}!</h2>
            {wallet && (
              <div className="bg-purple-100 bg-opacity-30 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-purple-700 mb-1">Wallet Address:</p>
                  <p className="text-sm font-bold text-purple-900 break-all">{formatAddress(wallet.address)}</p>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-purple-200 bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors ml-2"
                >
                  <ClipboardIcon className="h-5 w-5 text-purple-700" />
                </button>
              </div>
            )}
            <div className="flex rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab('balance')}
                className={`flex-1 py-2 text-center transition-colors ${
                  activeTab === 'balance'
                    ? 'bg-purple-200 text-purple-800'
                    : 'bg-purple-400 text-white hover:bg-purple-500'
                }`}
              >
                Token Balance
              </button>
              <button
                onClick={() => setActiveTab('trading')}
                className={`flex-1 py-2 text-center transition-colors ${
                  activeTab === 'trading'
                    ? 'bg-purple-200 text-purple-800'
                    : 'bg-purple-400 text-purple-100 hover:bg-purple-500'
                }`}
              >
                Trading
              </button>
            </div>
            {activeTab === 'balance' ? <TokenDisplay /> : <TradingPanel />}
          </div>
        ))}
      </div>
    </div>
  );
}
