import mongoose from "mongoose"

const prodCollection="productos"
const prodSchema=new mongoose.Schema(
    {
            title: String,
            description: String,
            price: Number,
            thumbnail: String,
            code: {
                type: String,
                required: true,
                unique: true
            },
            stock: Number,
            category: String,
            password: String
    },
    {
            timestamps: true
    }
)

export const modeloProductos=mongoose.model(prodCollection, prodSchema)