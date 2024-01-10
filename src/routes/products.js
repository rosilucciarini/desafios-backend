import { Router } from "express";
import ProductManager from '../controlles/productManager.js';

const ProductRouter = Router();
const productManager = new ProductManager();

ProductRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await productManager.getProducts());
    let allProducts = await productManager.getProducts();
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
});

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await productManager.getProductsById(id));
});

ProductRouter.post("/", async (req, res) =>{
    let newProduct = req.body
    res.send(await productManager.addProducts(newProduct))
});

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id;
    res.send(await productManager.deleteProducts(id));
});

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id;
    let newProduct = req.body;
    res.send(await productManager.updateProducts(id, newProduct));
});

export default ProductRouter;