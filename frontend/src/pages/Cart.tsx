import React, { useEffect, useState } from "react";
import api from "../api/api";

interface Product {
    _id: string;
    name: string;
    price: number;
}

interface CartItem {
    _id: string;
    productId: Product;
    qty: number;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await api.get("/cart");
            setCartItems(res.data.items);
            setTotal(res.data.total);
        } catch (err) {
            console.error("Failed to fetch cart:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (id: string) => {
        try {
            await api.delete(`/cart/${id}`);
            fetchCart();
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh] text-gray-500">Loading cart...</div>;
    }

    if (cartItems.length === 0) {
        return <div className="text-center mt-10 text-gray-500">Your cart is empty</div>;
    }

    const updateQty = async (id: string, newQty: number) => {
        try {
            if (newQty < 1) return; // optional: auto-remove if <1
            await api.patch(`/cart/${id}`, { qty: newQty });
            fetchCart(); // refresh cart
        } catch (err) {
            console.error("Failed to update quantity:", err);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-10 text-[#1E436F]">Your Cart</h1>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md"
                    >
                        <div>
                            <h2 className="font-semibold text-gray-800">{item.productId.name}</h2>
                            <p className="text-[#D8A452] font-medium">₹{item.productId.price} × {item.qty}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-bold text-lg text-[#D8A452]">
                                ₹{item.productId.price * item.qty}
                            </span>


                            <div
                                key={item._id}
                                className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md"
                            >


                                {/* Right: Controls */}
                                <div className="flex items-center space-x-4">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                        <button
                                            onClick={() => updateQty(item._id, item.qty - 1)}
                                            className="bg-blue-900 text-white px-3 py-1 hover:bg-blue-700 transition"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 text-gray-800 font-medium">{item.qty}</span>
                                        <button
                                            onClick={() => updateQty(item._id, item.qty + 1)}
                                            className="bg-blue-900 text-white px-3 py-1 hover:bg-blue-700 transition"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>








                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-md">
                <span className="text-xl font-semibold text-gray-800">Total: <span className="text-[#D8A452]">₹{total}</span></span>
                <a
                    href="/checkout"
                    className="bg-[#1E436F] text-white px-6 py-2 rounded-md font-medium hover:bg-[#2A5994] transition"
                >
                    Checkout
                </a>
            </div>
        </div>
    );
};

export default Cart;
