import mongoose from "mongoose";

const cartColl="cart"
const cartEsquema=new mongoose.Schema(
    {
        title:{type:String, required:true},
        code:{type:String, required:true}
    },
    {
        timestamps:true
    }
)

export const cartModelo=mongoose.model(cartColl, cartEsquema)