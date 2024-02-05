import { Schema, model } from "mongoose";

const BlackList_Schema = new Schema({
    token: {
        type: String,
        required: true
    }
})

export const BlackList = model("BlackList", BlackList_Schema);