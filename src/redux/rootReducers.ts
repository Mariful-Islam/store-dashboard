import { combineReducers } from 'redux';
import productReducer from "./productsSlice"
import customerReducer from "./userSlice"

const rootReducer = combineReducers({
  products: productReducer,
  customers: customerReducer
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
