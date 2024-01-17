const express = require("express");
const router = express.Router();

const CartManager = require("../controlles/cartManager.js");
const cartManager = new CartManager("./src/models/carts.json");

// Rutas

//http://localhost:8080/api/carts/

// Obtenemos todos los carritos
router.post("/", async (req, res) => {
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
        res.send("Producto agregado al carrito exitosamente");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al intentar agregar el producto al carrito");
    }
});

// Obtenemos un producto por su ID
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const response = await cartManager.getCartProducts(cid);
        res.json(response);
    } catch (error) {
        res.status(500).send('Error al intentar enviar los productos al carrito');
    }
});

module.exports = router;