import { createSlice } from "@reduxjs/toolkit";
import { useApi } from "../api/api";

interface customersState {
    results: any[];
}


const initialState: customersState = {
    results: [],
};


const customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        setCustomers(state, action) {
            state.results = action.payload;
        },
    },
});

export const { setCustomers } = customersSlice.actions;

export const fetchCustomers = () => async (dispatch: any) => {
    const api = useApi();
    try {
        const response = await api.getCustomers();
        dispatch(setCustomers(response.data));
    } catch (error) {
        console.error("Error retrieving customers", error);
    }
};


export default customersSlice.reducer;
