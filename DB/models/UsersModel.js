import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    Password: {
        type: String,
    },
    UserName: {
        type: String,
    },
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    Phone: {
        type: String,
        unique: true
    },
    Confirmed: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    }, Member: {
        type: String,
        default: "User"
    }
}, {
    timestamps: true
})

export const User = model("User", UserSchema);