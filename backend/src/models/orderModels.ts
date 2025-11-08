import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
    customer: {
        name: string;
        email: string;
    };
    items: {
        productId: mongoose.Types.ObjectId;
        qty: number;
    }[];
    total: number;
    createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            qty: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", orderSchema);
