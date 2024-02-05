import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const OrderScehma = new Schema({
    Order: String,
    Owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    Location: {
        type: String
    }
}, {
    timestamps: true
})

export const Orders = model("Orders", OrderScehma);