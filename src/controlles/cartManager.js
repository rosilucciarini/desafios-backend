const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
//se usa uuidv4 para generar ids automáticos! 

class CartManager{

    constructor(){
        this.path = "./src/models/carts.json";
        this.carts = [];
    }
    //Traemos todos lo carritos leyendo el carrito.json
    getCarts = () => {
        try {
            const response = fs.readFileSync(this.path, 'utf8');
            const responseJson = JSON.parse(response);
            return responseJson;
        } catch (error) {
            console.error(`Error leyendo el archivo: ${error.message}`);
            return [];
        }
    }

    getCartById(id) {
        const cart = this.carts.find(cart => cart.id == id);
        if (cart) {
            return cart;
        } else {
            console.log(`El carrito con el ID número ${id}. No fue encontrado.`);
        }
    }

    
    //Función que trae los productos por id del carrito
    getCartProducts = async (id) => {
       
        const carts = await this.getCarts();
        
        const cart = carts.find(cart =>cart.id == id);

       
        if (cart) {
            return cart.products;
        } else {
            throw new Error("Carrito no encontrado");
        }
        
    }

    //Función que crea un nuevo carrito 
    newCart = async () => {
        
        const id = uuidv4();
       
        const newCart = { id, products: [] };
       
        this.carts = await this.getCarts();
        this.carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        return newCart;
    }


    addProductToCart = async (cartId, productId) => {
            
            const carts = await this.getCarts();
    
            const index = carts.findIndex(cart => cart.id === cartId);
    
            
            if (index !== -1) {
               
                const cartProducts = carts[index].products
    
                
                const existingProductIndex = cartProducts.findIndex(product => product.title === productId);
    
                
                if (existingProductIndex !== -1) {
                    
                    cartProducts[existingProductIndex].quantity = (cartProducts[existingProductIndex].quantity || 0) + 1;
                } else {
                    
                    cartProducts.push({ title: productId, quantity: 1 });
                }
    
               
                carts[index].products = cartProducts;
    
                
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
            } else {
               
                throw new Error('Carrito no encontrado');
            }
    }
}

module.exports = CartManager;