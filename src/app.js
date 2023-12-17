
//Traigo express y mi archivo productManage
const express = require(`express`);
const ProductManager = require(`./productManager.js`);

const app = express();
const PORT = 3000;

//Configuración de la instancia de ProductManager con el archivo de productos
const productManager = new ProductManager("./src/productos.json");

//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

//Ruta inicial
app.get('/', (req,res) =>{
    res.send('Hola! hay rutas a seguir: /products , /products?limit=, /products/:pid ')
});

//Utilizamos la ruta /products para devolver una cantidad solicitada de productos
app.get('/products', async (req, res) => {
    try {
       
        const productos = await productManager.getProducts();

        
        let limit = parseInt(req.query.limit);

       
        if (!isNaN(limit)) {
           
            productosSliced = productos.slice(0, limit);
        } else {
            productosSliced = productos;  
        }

        res.send({ productosSliced });
    } catch (error) {
       
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

//Recibimos la ruta /products/pid 
app.get('/products/:pid', async (req, res) => {
    try {
       
        const  productId= parseInt(req.params.pid);
        
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