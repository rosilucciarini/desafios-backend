const express = require("express")
const router = express.Router()

const ProductManager = require("../controlles/productManager.js")
const productManager = new ProductManager("./src/models/productos.json")

router.get('/products', async (req, res) => {
    try {
        //Obtenemos la lista completa de productos con el método getProducts()
        const productos = await productManager.getProducts();

        
        let limit = parseInt(req.query.limit);

        //Si se establece un limite por parametro
        let productosListados;
        if (!isNaN(limit)) {
           
            productosListados = productos.slice(0, limit);
        } else {
            productosListados = productos;  
        }

        res.send({ productosListados });
    } catch (error) {
        //En caso de error, se envía una respuesta con estado 500 y un mensaje de error
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

//Recibimos la ruta /products/productId 
router.get('/products/:pid', async (req, res) => {
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

router.post('/agregarProducto', async(req, res) =>{
    try {
        const {id, title, description, price, thumbnail, code, stock} = req.body;
        const response = await productManager.addProduct({id, title, description, price, thumbnail, code, stock})
        res.json(response)
    } catch (error) {
        console.log('Error al agregar producto')       
    }
})
router.put('/editarProducto', async (req, res) => {
    try {
        const { id, title, description, price, thumbnail, code, stock } = req.body;
        const response = await productManager.updateProduct(id, { title, description, price, thumbnail, code, stock });
        res.send(response);
    } catch (error) {
        console.log('Error al editar producto:', error.message); // Imprime el error en la consola
        res.status(500).send({ error: 'Error al editar producto' }); // Envía una respuesta de error al cliente
    }
});
router.delete('/:pid/delete', async(req, res) => {
    try {
        await productManager.deleteProduct(id)
        res.send('Producto eliminado correctamente')
    } catch (error) {
        console.log('Error al intentar eliminar')        
    }
})

module.exports = router