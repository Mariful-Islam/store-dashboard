import { combineReducers } from 'redux';
import productReducer from "./productsSlice"


const rootReducer = combineReducers({
  products: productReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
