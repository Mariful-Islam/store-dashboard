import useInterceptor, { API_URL } from "./interceptor";

export const useApi = () => {
    
    const interceptor = useInterceptor()

    const api = {
        
        getDashboard: (params={}) => interceptor.get(`${API_URL}/store/dashboard/api/dashboard/`, {params: params}),
        
        
        getProducts: (params={}) => interceptor.get(`${API_URL}/store/product/api/products/`, {params: params}),
        createProduct: (data:any) => interceptor.post(`${API_URL}/store/product/api/products/`, data),
        getProductDetail: (slug:any) => interceptor.get(`${API_URL}/store/product/api/products/${slug}/`),
        productsWithVariants: (params={}) => interceptor.get(`${API_URL}/store/product/api/product-with-variants/`, {params: params}),

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
        getDiscountDetail: (id:any) => interceptor.get(`${API_URL}/store/discount/api/discounts/${id}/`),

    }
    return api
}