import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { 
        getAll, 
        add, 
        deleteProd,
        update, 
        } from './CRUDAPI';
import Product from '../../Models/Product';


export interface registerState {
  logged: boolean,
  token: string,
  products: Product[],


}

const initialState: registerState = {
  logged: false,
  token: "",
  products: [],


};



export const getAllAsync = createAsyncThunk(
  'CRUD/getAll',
  async () => {
    console.log('test')
    const response = await getAll();
    return response.data;
  }
);

export const deleteAsync = createAsyncThunk(
  'CRUD/deleteProd',
  async (id: number) => {
    console.log('test')
    const response = await deleteProd(id);
    return id;
  }
);

export const addAsync = createAsyncThunk(
  'CRUD/add',
  async (product: Product) => {
    console.log('adddd')
    const response = await add(product);
    return response.data;
  }
);

export const updateAsync = createAsyncThunk(
  'CRUD/update',
  async (product: Product) => {
    console.log('update')
    const response = await update(product);
    return response.data;
  }
);

export const CRUDSlice = createSlice({
  name: 'CRUD',
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
      
      .addCase(getAllAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.products = action.payload
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.products.push(action.payload)
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.products = state.products.filter(prod => prod.id != action.payload)
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        let itemToUpdate = state.products.filter(prod => prod.id === action.payload.id)[0]
        itemToUpdate.price = action.payload.price
        itemToUpdate.desc = action.payload.desc
      })
      
      
      
  },
});

export const { logout } = CRUDSlice.actions;
export const selectProducts = (state: RootState) => state.CRUD.products; 



export default CRUDSlice.reducer;
