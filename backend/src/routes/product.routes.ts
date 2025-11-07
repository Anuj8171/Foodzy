import { Router } from "express";
import { allproducts, order, productById } from "../controllers/product.controller";
import { protectRoute } from "../middleware/protect";


const productRouter = Router();
productRouter.get('/',allproducts);
productRouter.get('/product/:id',productById);
productRouter.post('/order',order);

export default productRouter;

