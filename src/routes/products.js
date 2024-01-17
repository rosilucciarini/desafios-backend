const express = require("express")
const router = express.Router()

const ProductManager = require("../controlles/productManager.js")
const productManager = new ProductManager("./src/models/productos.json")

const CartManager = require("../controlles/cartManager.js")
const cartManager = new CartManager("./src/models/carts.json")

router.get('/products', async (req, res) => {
    try {
        //Obtenemos la lista completa de productos con el método getProducts()
        const productos = await productManager.getProducts();

        
        let limit = parseInt(req.query.limit);

        
        let productosListados;
        if (!isNaN(limit)) {
           
            productosListados = productos.slice(0, limit);
        } else {
            productosListados = productos; 
        }

        res.send({ productosListados });
    } catch (error) {
        
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

//Recibimos la ruta /products/productId 
router.get('/:pid', async (req, res) => {
    try {
         
        const productId = parseInt(req.params.pid);
          
        const product = await productManager.getProductById(productId);
        
        
        if (product) {
            res.send(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { productId, quantity, cartId } = req.body;

       
        const product = productManager.getProductById(productId);

        const cart = cartManager.getCartById(cartId)

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        console.log('cartId:', cartId);

        
        await cartManager.addProductToCart(cartId, productId, quantity);

        res.json({ message: 'Producto agregado al carrito con éxito' });
    } catch (error) {
        console.error('Error al agregar producto al carrito', error.message);
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
});

router.put('/editarProducto', async (req, res) => {
    try {
        const { id, title, description, price, thumbnail, code, stock } = req.body;

        
        const response = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock });
        
        res.send(response);

        
        const productoActualizado = await productManager.getProductById(id);   
        console.log(productoActualizado)
    } catch (error) {
        console.log('Error al editar producto:', error.message); // Imprime el error en la consola
        res.status(500).send({ error: 'Error al editar producto' }); // Envía una respuesta de error al cliente
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        console.log('Error al intentar eliminar', error);
        res.status(500).send('Error al intentar eliminar el producto');
    }
});


module.exports = router