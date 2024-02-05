import mongoose from "mongoose";

export const Connection = async () => {
    return await mongoose.connect('mongodb://127.0.0.1:27017/Users').then(() => {
        console.log("DataBase connected")
    })
}