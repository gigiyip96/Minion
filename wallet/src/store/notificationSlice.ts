import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface NotificationPayload {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationPayload>) => {
      const { message, type } = action.payload;
      toast[type](message);
    },
  },
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
