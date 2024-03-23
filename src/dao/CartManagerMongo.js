import { cartModelo } from "./models/cart.modelo.js";

export class CartManagerMongo{
    constructor(){}

    async getCart(){
        return await cartModelo.find().lean()
    }

    async getCartBy(filtro){
        return await cartModelo.findOne(filtro).lean()
      }

    async addCart(cart) {
        return await cartModelo.create(cart);
    }
}