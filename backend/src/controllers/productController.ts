import { Request, Response } from "express";
import Product from "../models/productModel";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products", error: err });
    }
};

// optional seed route to populate products quickly
export const seedProducts = async (req: Request, res: Response) => {
    try {
        const mockProducts = [
            { name: "Vibe T-Shirt", price: 499, image: "https://source.unsplash.com/300x300/?tshirt" },
            { name: "Vibe Sneakers", price: 1999, image: "https://source.unsplash.com/300x300/?sneakers" },
            { name: "Vibe Hoodie", price: 1299, image: "https://source.unsplash.com/300x300/?hoodie" },
            { name: "Vibe Cap", price: 399, image: "https://source.unsplash.com/300x300/?cap" },
        ];
        await Product.insertMany(mockProducts);
        res.json({ message: "Mock products added!" });
    } catch (err) {
        res.status(500).json({ message: "Error seeding products", error: err });
    }
};
