import { RootState } from '@/store/store';
import { logout, setUser } from '@/store/userSlice';
import TelegramLoginButton, { TelegramUser } from '@v9v/ts-react-telegram-login';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyTelegramHash } from '../utils/verify';
import { showNotification } from '@/store/notificationSlice';

const TelegramLogin: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);

  const handleTelegramResponse = async(telegramUser: TelegramUser) => {
    if (verifyTelegramHash(telegramUser)) {
      dispatch(setUser(telegramUser));
      dispatch(showNotification({ message: 'Login Success!', type: 'success' }));
    } else {
      console.error('Invalid Telegram data');
      dispatch(logout());
      dispatch(showNotification({ message: 'Login Failed, Please Try Again.', type: 'error' }));
    }
  };

  if (isLoggedIn && user) {
    return (
      <div className="flex flex-col items-center">
        {/* <Image src={user.photo_url!!} alt={user.first_name} className="w-20 h-20 rounded-full mb-4" /> */}
        <h2 className="text-xl font-bold mb-2">{user.first_name}</h2>
        <p className="text-lg">Telegram ID: {user.id}</p>
        {/* <p className="text-lg">用户名: {user.username}</p> */}
        <p className="text-lg">认证日期: {new Date(user.auth_date * 1000).toLocaleString()}</p>
        <p className="text-lg">哈希: {user.hash.slice(0, 10)}...</p>
      </div>
    );
  }

  return (
    <TelegramLoginButton
      botName={process.env.NEXT_PUBLIC_BOT_NAME || ''}
      dataOnAuth={handleTelegramResponse}
      buttonSize="large"
      cornerRadius={20}
      requestAccess={true}
    />
  );
};

export default TelegramLogin;