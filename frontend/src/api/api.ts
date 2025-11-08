import axios from "axios";

const api = axios.create({
    baseURL: "https://vibe-commerce-hi1y.onrender.com/api/",
});

// ✅ Products
export const getProducts = async () => {
    const res = await api.get("/products");
    return res.data;
};

// ✅ Single Product
export const getProductById = async (id: string) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
};

// ✅ Cart
export const getCart = async (userId: string) => {
    const res = await api.get(`/cart/${userId}`);
    return res.data;
};

export const addToCart = async (data: { userId: string; productId: string; quantity: number }) => {
    const res = await api.post("/cart", data);
    return res.data;
};

export const removeFromCart = async (cartItemId: string) => {
    const res = await api.delete(`/cart/${cartItemId}`);
    return res.data;
};

// ✅ Checkout
export const checkout = async (data: { userId: string; paymentMethod: string }) => {
    const res = await api.post("/checkout", data);
    return res.data;
};

export default api;
