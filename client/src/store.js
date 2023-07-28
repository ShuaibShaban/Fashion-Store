import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/slice';
import userReducer from './features/users/slice'
import ordersReducer from './features/orders/slice'
import reviewsReducer from './features/reviews/slice'
import cartReducer from './features/cart/slice'
import loginReducer from './features/users/userLogin'
import logoutReducer from './features/users/logoutSlice'
import userSignupReducer from './features/users/createUserSlice'
const store = configureStore({
  reducer: {
    products: productsReducer,
    users: userReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    cart:cartReducer,
    user: loginReducer,
    logout: logoutReducer,
    userSignup: userSignupReducer,
  },
});

export default store;
/*
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './features/products/slice';
import userReducer from './features/users/slice'
import ordersReducer from './features/orders/slice'
import reviewsReducer from './features/reviews/slice'
import cartReducer from './features/cart/slice'


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({

    products: productsReducer,
    users: userReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
    cart:cartReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;
*/