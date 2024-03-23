import { modeloProductos } from "./models/productos.modelo.js"

//.lean() sirve para convertir de documento hidratado a documento normal la salida que entrega mongoose
//y se usa en los find()

export class ProductsManager{
    constructor(){}

    async getProducts(){
        return await modeloProductos.find().lean()
}

async getProductById(id){
  //este es un metodo propio de mongoose(findById)
  return await modeloProductos.findById(id).lean()
}

async getProductByCode(code){
  return await modeloProductos.findOne({code}).lean()
}

async getProductBy(filtro){
  return await modeloProductos.findOne(filtro).lean()
}

async addProduct(product) {
    return await modeloProductos.create(product);
}

async updateProduct(id, modificacion={}){
  return await modeloProductos.updateOne({_id:id}, modificacion)
}

async deleteProduct(id){
  return await modeloProductos.deleteOne({_id:id})
}

}