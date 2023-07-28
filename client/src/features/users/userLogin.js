import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = 'Please make sure password and email are filled out correctly';
    },
    clearUserLoginState: (state) => {
      state.error = null;
      state.user = null;
     // state.status = 'idle';
    },
  },
});
export const { clearUserLoginState } = userSlice.actions;
export const { setUser, setError } = userSlice.actions;

export const loginAccount = (userData) => async (dispatch) => {
  
    
     fetch('https://fashion-store-deployed.onrender.com/login_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        
      }).then(res=>res.json())
      .then(data=>{
        if(data.message === 'Log in success'){
          const token = data.body.token;
          localStorage.setItem('token', token);
          dispatch(setUser(data.body));
        }else{
          dispatch(setError('Please make sure password and email are filled out correctly'));
        }    
      })
  };
  
export default userSlice.reducer;