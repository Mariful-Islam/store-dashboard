import { createSlice } from "@reduxjs/toolkit";
import { useApi } from "../api/api";

interface ProductsState {
    results: any[];
}


const initialState: ProductsState = {
    results: [],
};


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action) {
            state.results = action.payload;
        },
    },
});


export const { setProducts } = productsSlice.actions;

export const fetchProducts = () => async (dispatch: any) => {
    const api = useApi();
    try {
        const response = await api.getProducts();
        // const data = await response.data
        // console.log(data, "---------------")
        dispatch(setProducts(response.data));
    } catch (error) {
        console.error("Error retrieving products:", error);
    }
};


export default productsSlice.reducer;
