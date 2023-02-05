import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import organizationReducer from '../reducers/organizationReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    organization: organizationReducer
  },
});
