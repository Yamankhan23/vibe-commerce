import { Request, Response } from "express";
import Cart from "../models/cartModel";
import Order from "../models/orderModels"; // make sure filename matches exactly

export const checkout = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        // Fetch cart items
        const cartItems = await Cart.find().populate("productId");

        if (!cartItems.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total
        const total = cartItems.reduce((sum, item) => {
            const price = (item.productId as any)?.price || 0;
            return sum + price * item.qty;
        }, 0);

        // Save order in DB
        const newOrder = await Order.create({
            customer: { name, email },
            items: cartItems.map(item => ({
                productId: item.productId._id,
                qty: item.qty,
            })),
            total,
        });
        await newOrder.populate("items.productId");
        // Clear cart after checkout
        await Cart.deleteMany({});

        // Return full order object
        res.status(200).json({ message: "Checkout successful", receipt: newOrder });
    } catch (err) {
        console.error("Checkout error:", err);
        res.status(500).json({ message: "Checkout failed", error: err });
    }
};
