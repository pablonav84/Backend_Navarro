import { Router } from 'express';
import { ProductsManager } from '../dao/ProductsManagerMongo.js';
import { rutaProducts } from '../utils.js';
import { ChatManager } from '../dao/chatManagerMongo.js';

export const router=Router()
let chatMnager=new ChatManager()
let productsManager=new ProductsManager()

router.get("/",(req, res) => {
      res.setHeader("Content-Type", "text/html");
      return res.status(200).render("home");
  });

  router.get('/chat', async (req, res) => {
    let {nombre, mensaje}=req.body
let nuevoMensaje= await chatMnager.guardarMensaje(nombre, mensaje)
    res.setHeader("Content-Type", "text/html");
    res.status(200).render('chat', nuevoMensaje);
  })

router.get("/products", async (req, res) => {    
let products=await productsManager.getProducts()
    res.setHeader("Content-Type", "text/html");
    return res.status(200).render("products", {products});
});