import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [receipt, setReceipt] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/checkout", { name, email });
            setReceipt(res.data.receipt); // backend sends { receipt: newOrder }
        } catch (err) {
            console.error("Checkout failed:", err);
            alert("Checkout failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    if (receipt) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <h1 className="text-3xl font-semibold mb-6 text-[#1E436F]">Receipt</h1>
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-2">
                    <p><strong>Name:</strong> {receipt.customer?.name}</p>
                    <p><strong>Email:</strong> {receipt.customer?.email}</p>
                    <p><strong>Total:</strong> <span className="text-[#D8A452]">₹{receipt.total}</span></p>
                    <p><strong>Time:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>
                    <p><strong>Items:</strong></p>
                    <ul className="list-disc ml-5">
                        {receipt.items.map((item: any) => (
                            <li key={item.productId._id}>
                                {item.productId?.name || "Product"} × {item.qty}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => { setReceipt(null); navigate("/") }}
                        className="mt-4 w-full bg-[#D8A452] text-black py-2 rounded-md font-medium hover:bg-[#c79945] transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center text-[#1E436F]">Checkout</h1>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E436F]"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E436F]"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1E436F] text-white py-2 rounded-md font-medium hover:bg-[#2A5994] transition"
                >
                    {loading ? "Processing..." : "Place Order"}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
