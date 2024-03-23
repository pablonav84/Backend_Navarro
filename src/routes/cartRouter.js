import { Router } from "express";
import { CartManagerMongo } from "../dao/CartManagerMongo.js";
export const router=Router()

let cartManager=new CartManagerMongo()

router.get("/", async (req,res)=>{

let cart=await cartManager.getCart()

    res.setHeader("Content-Type", "application/json")
    res.status(200).json(cart)
})

router.post("/", async (req, res) => {
    let {
      title,
      code,
    } = req.body;
    
    // Verificar si alguno de los campos está incompleto
    if (
      !title ||
      !code
    ) {
      res.status(400).json({ error: "Hay campos que faltan ser completados" });
      return;
    }
  
    // Verificar si el código ya existe
    let dato=req.body
    if(dato.code){
        let existCode=await cartManager.getCartBy({code:dato.code})
    if (existCode) {
      res
        .status(400)
        .json({ error: "Ya existe un producto con el mismo código" });
      return;
    }

    try {
      let nuevoCart = await cartManager.addCart({
        title,
        code,
      });
      res.setHeader("Content-Type", "application/json");
      return res.status(201).json({ payload: nuevoCart });
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({
        error: `Error inesperado en el servidor`,
        detalle: error.message,
      });
    }
}
  });