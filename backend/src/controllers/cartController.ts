import { Request, Response } from "express";
import Cart from "../models/cartModel";
import Product from "../models/productModel";

// GET /api/cart
export const getCart = async (req: Request, res: Response) => {
    try {
        const cartItems = await Cart.find().populate("productId");
        const total = cartItems.reduce((sum, item) => {
            const price = (item.productId as any)?.price || 0;
            return sum + price * item.qty;
        }, 0);

        res.json({ items: cartItems, total });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cart", error: err });
    }
};

// POST /api/cart
export const addToCart = async (req: Request, res: Response) => {
    try {
        const { productId, qty } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const existingItem = await Cart.findOne({ productId });
        if (existingItem) {
            existingItem.qty += qty;
            await existingItem.save();
            return res.json({ message: "Cart updated", item: existingItem });
        }

        const newItem = await Cart.create({ productId, qty });
        res.status(201).json({ message: "Added to cart", item: newItem });
    } catch (err) {
        res.status(500).json({ message: "Failed to add item", error: err });
    }
};

// DELETE /api/cart/:id
export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Cart.findByIdAndDelete(id);
        res.json({ message: "Item removed" });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove item", error: err });
    }
};

// PATCH /api/cart/:id
export const updateCartQty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { qty } = req.body;

        if (qty < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

        const item = await Cart.findById(id);
        if (!item) return res.status(404).json({ message: "Cart item not found" });

        item.qty = qty;
        await item.save();

        res.json({ message: "Quantity updated", item });
    } catch (err) {
        res.status(500).json({ message: "Failed to update quantity", error: err });
    }
};
