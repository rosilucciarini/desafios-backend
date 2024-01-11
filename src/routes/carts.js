const express = require("express");
const router = express.Router();

const CartManager = require("../controlles/cartManager.js");
const cartManager = new CartManager("./src/models/carts.json");

// Rutas 

// Obtenemos todos los carritos
router.post("/carts", async (req, res) => {
    try {
        const response = await cartManager.newCart();
        res.json(response);
    } catch (error) {
        console.log("Error, no se pudo crear carrito", error);
    }
});

// Creamos un nuevo carrito
router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        
        await cartManager.addProductToCart(cid, pid);

    } catch (error) {

        console.error(error);
        
    }
});
// Obtenemos un producto por su ID
router.get("/:cid", async (req, res) => {
    const {cid} = req.params;
    try {
        const response = await cartManager.getCartProducts(cid)
        res.json(response)
    } catch (error) {
        res.send('Error al intentar enviar los productos al carrito')
    }
});

module.exports = router;