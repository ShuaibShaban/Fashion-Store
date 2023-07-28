import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    deliveryOption: '',
    sumCost: 0,
    totalItems: 0,
    productDetail: null
  },
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
    },
    removeFromCart(state, action) {
      console.log('removeFromCart reducer called with action:', action, state);
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    setDeliveryOption(state, action) {
      state.deliveryOption = action.payload;
    },
    updateItemQuantity(state, action) {
      console.log('update action:', action);
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      console.log('updateItemQuantity reducer returned state:', state);
    },
    setSumCost(state, action){
      state.sumCost = action.payload
    },
    setTotalItems(state, action){
      state.totalItems = action.payload
    },
    setProductDetail(state, action){
      state.productDetail = action.payload
    },
      clearCartState: (state) => {
        state.items = [];
        state.deliveryOption = '';
        state.sumCost = 0;
        state.totalItems = 0;
        state.productDetail = null;
      },
    
  },
});

export const { addToCart, removeFromCart, setDeliveryOption, updateItemQuantity, setSumCost, setTotalItems, setProductDetail, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;