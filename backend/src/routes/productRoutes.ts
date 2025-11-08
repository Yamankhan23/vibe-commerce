import express from "express";
import { getProducts, seedProducts } from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);
router.post("/seed", seedProducts); // optional for quick mock data

export default router;
