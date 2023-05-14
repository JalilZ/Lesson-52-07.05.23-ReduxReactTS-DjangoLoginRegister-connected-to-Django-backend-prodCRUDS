import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { register } from './RegisterAPI';

export interface registerState {
  logged: boolean,
  token: string,

}

const initialState: registerState = {
  logged: false,
  token: "",
};




export const registerAsync = createAsyncThunk(
  'register/register',
  async (user: any) => {
    console.log(user)
    const response = await register(user);
    return response.data;
  }
);



export const registerSlice = createSlice({
  name: 'Register',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
    logout: (state) => {
      state.logged = false
      state.token = ''
      sessionStorage.clear()

      
    },
  },

  extraReducers: (builder) => {
    builder
      
      .addCase(registerAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        
      })
      
      
  },
});

export const { logout } = registerSlice.actions;
export const selectLogged = (state: RootState) => state.Register.logged; //no need to show token
// export const selectUsr = (state: RootState) => state.login.usr; //no need to show token



export default registerSlice.reducer;
