import { Router } from 'express';
import { ProductsManager } from '../dao/ProductsManagerMongo.js';

export const router=Router()

let productsManager=new ProductsManager()

router.get("/",(req, res) => {
      res.setHeader("Content-Type", "text/html");
      return res.status(200).render("home");
  });

  router.get('/chat', async (req, res) => {
    
    res.setHeader("Content-Type", "text/html");
    res.status(200).render('chat');
  })

router.get("/products", async (req, res) => {    
let products=await productsManager.getProducts()
    res.setHeader("Content-Type", "text/html");
    return res.status(200).render("products", {products});
});