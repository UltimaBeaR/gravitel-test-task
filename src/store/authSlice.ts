import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state,  action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  }
});

export const {
  setIsAuthenticated
} = slice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default slice.reducer;