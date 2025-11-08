import express from "express";
import { addToCart, getCart, removeFromCart, updateCartQty } from "../controllers/cartController";


const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", removeFromCart);
router.patch("/:id", updateCartQty);

export default router;
