import {promises as fs} from 'fs';
import {nanoid} from 'nanoid';
import ProductManager from './productManager.js';

const productAll = new ProductManager;

class CartManager {
    constructor(){
        this.path = "./src/models/carts.json";
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(carts);
    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    }

    existCarts = async (id) => {
        let carts = await this.readCarts();
        return carts.find(item => item.id === id);
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts()  
        let id = nanoid(2);
        let cartsConcat = [{id : id, products : []}, ...cartsOld];
        await this.writeCarts(cartsConcat);
        return "Carrito agregado con exito"
    }

    getCartsById = async (id) => {
        let cartsById = await this.existCarts(id);
        if (!cartsById) return "Carrito no encontrado"
        return cartsById;
    }

    addProductToCart = async (cartId, productId) => {
        let cartById = await this.existCarts(cartId);
        if (!cartById) return "Carrito no encontrado"
        let productById = await productAll.existProduct(productId);
        if (!cartById) return "Producto no encontrado"
        let cartsAll = await this.readCarts();
        let cartFilter = cartsAll.filter((item) => item.id != cartId);

        if(cartById.products.some((item) => item.id === productId)){
            let moreProductInCar = cartById.products.find((item) => item.id === productId);
            moreProductInCar.quantity++;
            let cartsConcat = [cartById, ...cartFilter];
            await this.writeCarts(cartsConcat);
            return "Producto sumado al carrito con exito"
        }

        cartById.products.push({id: productById.id, quantity: 1});
        let cartsConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartsConcat);
        return "Producto agregado al carrito con exito"
       
    }
}

export default CartManager;