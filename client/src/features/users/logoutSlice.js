import { createSlice } from '@reduxjs/toolkit';
import { clearUserLoginState } from './userLogin';
import { clearUserSignupState } from './createUserSlice';
const initialState = {
  error: null,
  success: null,
  loading: false,
};

export const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.success = 'Logout successful';
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },
    clearLogoutState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const { logoutStart, logoutSuccess, logoutFailure, clearLogoutState } = logoutSlice.actions;

export const logoutUser = () => async (dispatch) => {
  

  try {
    const response = await fetch('https://fashion-store-deployed.onrender.com/logout_account', {
      method: 'delete',
     // this is important to send the cookie with the request
    });

    if (response.ok) {
        console.log(response)
      
      dispatch(clearUserLoginState()); // clear user state after successful logout
      dispatch(clearUserSignupState())
    } else {
      const error = await response.text();
      dispatch(logoutFailure(error));
    }
  } catch (error) {
    console.log(error)
    dispatch(logoutFailure(error.message));
  }
};

export default logoutSlice.reducer;
