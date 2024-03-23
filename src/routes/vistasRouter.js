import { Router } from 'express';
//import { ProductsManager } from '../classes/ProductsManager.js';
//import { rutaArchivo } from '../utils.js';

export const router = Router();

//let productsManager = new ProductsManager(rutaArchivo);

router.get('/', (req, res) => {
  res.status(200).render('home');
})