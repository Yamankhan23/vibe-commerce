import React, { useEffect, useState } from "react";
import api from "../api/api";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (product: Product) => {
        try {
            const res = await api.post("/cart", { productId: product._id, qty: 1 });
            console.log("Added to cart:", res.data);
            alert(`${product.name} added to cart!`);
        } catch (err) {
            console.error("Failed to add to cart:", err);
            alert("Failed to add product to cart.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
                Loading products...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <h1 className="text-3xl font-semibold text-center mb-10 text-[#1E436F]">
                Furniture Collection
            </h1>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {product.name}
                            </h2>
                            <p className="text-gray-600 text-sm line-clamp-2">
                                {product.description}
                            </p>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[#D8A452] font-bold text-lg">
                                    ₹{product.price}
                                </span>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-[#1E436F] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#2A5994] transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
