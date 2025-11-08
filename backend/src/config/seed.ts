import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/productModel";

dotenv.config();

const products = [
    {
        name: "Modern Wooden Chair",
        price: 2999,
        image: "https://plus.unsplash.com/premium_photo-1704686580555-6f31384f756a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
        description: "Elegant handcrafted wooden chair designed for comfort and style.",
        category: "Chairs",
    },
    {
        name: "Minimalist Coffee Table",
        price: 5499,
        image: "https://plus.unsplash.com/premium_photo-1682582241642-d16c69cc087c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=791",
        description: "Sleek coffee table made with oak wood and matte finish surface.",
        category: "Tables",
    },
    {
        name: "Scandinavian Sofa",
        price: 18999,
        image: "https://images.unsplash.com/photo-1759722668087-efcc63c91ed2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=754",
        description: "Three-seater sofa with plush cushions and minimalist Scandinavian design.",
        category: "Sofas",
    },
    {
        name: "Industrial Bookshelf",
        price: 7999,
        image: "https://images.unsplash.com/photo-1741880893442-66f56ad8f3a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=953",
        description: "Rustic metal and wood bookshelf perfect for modern interiors.",
        category: "Storage",
    },
    {
        name: "Luxury Bed Frame",
        price: 24999,
        image: "https://images.unsplash.com/photo-1719364477635-196329162e60?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
        description: "Premium king-sized bed frame with padded headboard and oak base.",
        category: "Beds",
    },
    {
        name: "Round Dining Table",
        price: 9999,
        image: "https://plus.unsplash.com/premium_photo-1675744019096-a8dd642b0f9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=871",
        description: "Stylish round dining table with walnut finish, seats up to four.",
        category: "Dining",
    },
    {
        name: "Office Work Desk",
        price: 7499,
        image: "https://images.unsplash.com/photo-1692355120825-14962a0c33dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
        description: "Compact wooden desk with drawers, ideal for home or office workspace.",
        category: "Desks",
    },
    {
        name: "Recliner Armchair",
        price: 11999,
        image: "https://images.unsplash.com/photo-1698373890183-ae3943362fda?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1034",
        description: "Comfortable recliner chair with soft leather finish and leg rest.",
        category: "Chairs",
    },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("✅ Furniture products seeded successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
