import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="bg-[#1E436F] text-white p-4 flex justify-between items-center shadow-lg">
            <Link to="/" className="text-2xl font-bold tracking-wide hover:text-[#D8A452] transition">
                Vibe Commerce
            </Link>
            <nav className="space-x-6">
                <Link
                    to="/"
                    className="text-lg font-medium hover:text-[#D8A452] transition"
                >
                    Products
                </Link>
                <Link
                    to="/cart"
                    className="text-lg font-medium hover:text-[#D8A452] transition"
                >
                    Cart
                </Link>
            </nav>
        </header>
    );
};

export default Header;
