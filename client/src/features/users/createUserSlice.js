import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: null,
  error: null,
};

const usersSlice = createSlice({
  
  name: 'userSignup',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.error = null;
    },
    setErrors(state, action) {
      state.error = 'Please make sure password and email are filled out correctly';
    },
   clearUserSignupState: (state) => {
      state.error = null;
      state.users = null;
     // state.status = 'idle';
    },
  },
});
export const { clearUserSignupState } = usersSlice.actions;
export const { setUsers, setErrors } = usersSlice.actions;

export const addNewUser = (userData) => async (dispatch) => {
  
    
     fetch('https://fashion-store-deployed.onrender.com/create_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        
      }).then(res=>res.json())
      .then(data=>{
        if(data.message === 'Registration was successful'){
         console.log(data)
          dispatch(setUsers(data));
        }else{
          dispatch(setErrors('Please make sure password and email are filled out correctly'));
        }

      
      })

  };

  

export default usersSlice.reducer;