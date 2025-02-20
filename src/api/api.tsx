import useInterceptor, { API_URL } from "./interceptor";

export const useApi = () => {
    
    const interceptor = useInterceptor()

    const api = {
        getProducts: (params={}) => interceptor.get(`${API_URL}/store/product/api/products/`, {params: params}),
        createProduct: (data:any) => interceptor.post(`${API_URL}/store/product/api/products/`, data),
        getProductDetail: (slug:any) => interceptor.get(`${API_URL}/store/product/api/products/${slug}/`),
        
        getCustomers: () => interceptor.get(`${API_URL}/store/user/api/customers/`),
        createCustomers: (data:any) => interceptor.post(`${API_URL}/store/user/api/customers/`, data),
        
        getRetailers: () => interceptor.get(`${API_URL}/store/user/api/retailers/`),
        createRetailers: (data:any) => interceptor.post(`${API_URL}/store/user/api/retailers/`, data),
        
        getOrders: () => interceptor.get(`${API_URL}/store/order/api/orders/`),
        createOrders: (data:any) => interceptor.post(`${API_URL}/store/order/api/orders/`, data),
        getOrderDetail: (id:number) => interceptor.get(`${API_URL}/store/order/api/orders/${id}/`),

        getVariants: () => interceptor.get(`${API_URL}/store/product/api/product-variants/`)

    }
    return api
}