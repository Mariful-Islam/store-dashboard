import useInterceptor, { API_URL } from "./interceptor";

export const useApi = () => {
    
    const interceptor = useInterceptor()

    const api = {
        
        getDashboard: (params={}) => interceptor.get(`${API_URL}/store/dashboard/api/dashboard/counter/`, {params: params}),
        getSalesData: (params={}) => interceptor.get(`${API_URL}/store/dashboard/api/dashboard/sales/`, {params: params}),
        getTopSellingProductVariant: (params={}) => interceptor.get(`${API_URL}/store/dashboard/api/dashboard/top-selling-variant/`, {params: params}),
        getTopCutomers: (params={}) => interceptor.get(`${API_URL}/store/dashboard/api/dashboard/top-customers/`, {params: params}),
        getTopRetailers: (params={}) => interceptor.get(`${API_URL}/store/dashboard/api/dashboard/top-retailers/`, {params: params}),


        getProducts: (params={}) => interceptor.get(`${API_URL}/store/product/api/products/`, {params: params}),
        createProduct: (data:any) => interceptor.post(`${API_URL}/store/product/api/products/`, data),
        editProduct: (slug:string, data:any) => interceptor.put(`${API_URL}/store/product/api/products/${slug}/`, data),
        getProductDetail: (slug:any) => interceptor.get(`${API_URL}/store/product/api/products/${slug}/`),
        productsWithVariants: (params={}) => interceptor.get(`${API_URL}/store/product/api/product-with-variants/`, {params: params}),


        // categories
        getCategories: (params={}) => interceptor.get(`${API_URL}/store/category/api/category-list/`, {params: params}),
        createCategory: (data:any) => interceptor.post(`${API_URL}/store/category/api/category/`, data),
        createSubCategory: (data:any) => interceptor.post(`${API_URL}/store/category/api/sub-category/`, data),
        createSubSubCategory: (data:any) => interceptor.post(`${API_URL}/store/category/api/sub-sub-category/`, data),
        
        editCategory: (data:any, id:number) => interceptor.put(`${API_URL}/store/category/api/category/${id}/`, data),
        editSubCategory: (data:any, id:number) => interceptor.put(`${API_URL}/store/category/api/sub-category/${id}/`, data),
        editSubSubCategory: (data:any, id:number) => interceptor.put(`${API_URL}/store/category/api/sub-sub-category/${id}/`, data),
        


        getCustomers: (params={}) => interceptor.get(`${API_URL}/store/user/api/customers/`, {params: params}),
        createCustomers: (data:any) => interceptor.post(`${API_URL}/store/user/api/customers/`, data),
        getCustomerDetail: (id:number) => interceptor.get(`${API_URL}/store/user/api/customers/${id}/`),
        editCustomer: (id:number, data:any) => interceptor.put(`${API_URL}/store/user/api/customers/${id}/`, data),

        getRetailers: (params={}) => interceptor.get(`${API_URL}/store/user/api/retailers/`, {params: params}),
        createRetailers: (data:any) => interceptor.post(`${API_URL}/store/user/api/retailers/`, data),
        getRetailerDetail: (id: number) => interceptor.get(`${API_URL}/store/user/api/retailers/${id}/`),
        editRetailer: (id:number, data:any) => interceptor.put(`${API_URL}/store/user/api/retailers/${id}/`, data),


        getOrders: (params={}) => interceptor.get(`${API_URL}/store/order/api/orders/`, {params: params}),
        createOrders: (data:any) => interceptor.post(`${API_URL}/store/order/api/orders/`, data),
        getOrderDetail: (id:number) => interceptor.get(`${API_URL}/store/order/api/orders/${id}/`),

        getVariants: (params={}) => interceptor.get(`${API_URL}/store/product/api/product-variants/`, {params: params}),
        createVariant: (data:any) => interceptor.post(`${API_URL}/store/product/api/product-variants/`, data),
        deleteVariant: (id:number) => interceptor.delete(`${API_URL}/store/product/api/product-variants/${id}/`),
        editVariant: (id:number, data:any) => interceptor.put(`${API_URL}/store/product/api/product-variants/${id}/`, data),


        makePayment: (data:any) => interceptor.post(`${API_URL}/store/payment/api/payments/`, data),



        // Discount
        getDiscounts: (params={}) => interceptor.get(`${API_URL}/store/discount/api/discounts/`, {params: params}),
        createDiscount: (data:any) => interceptor.post(`${API_URL}/store/discount/api/discounts/`, data ),
        editDiscount: (id:any, data:any) => interceptor.put(`${API_URL}/store/discount/api/discounts/${id}/`, data),
        
        getDiscountDetail: (id:any) => interceptor.get(`${API_URL}/store/discount/api/discounts/${id}/`),

        

        // account

        singup: (data:any) => interceptor.post(`${API_URL}/store/user/api/signup/`, data ),
        login: (data:any) => interceptor.post(`${API_URL}/store/user/api/login/`, data ),
        tokenVerify: (data) => interceptor.post(`${API_URL}/store/user/api/token/verify/`, data ),
   
    }
    return api
}