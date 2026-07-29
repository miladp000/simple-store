import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/products.controller.js';

const routes = new Router();

routes.get('/', getProducts);
routes.post('/',createProduct);
routes.delete('/:id', deleteProduct);
routes.put('/:id' , updateProduct)

export default routes;
