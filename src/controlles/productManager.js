
import {promises as fs} from 'fs';
import {nanoid} from 'nanoid';

class ProductManager{
    constructor(){
        this.path = "./src/models/productos.json";

}

    readProducts = async () => {
        let products = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(products);
    }

    writeProducts = async (products) => {
        await fs.writeFile(this.path, JSON.stringify(products));
    }

    existProduct = async (id) => {
        let products = await this.readProducts();
        return products.find(item => item.id === id);
    }

    addProducts = async (product) => {
        let productsOld = await this.readProducts()  
        product.id = nanoid(2);  
        let productsAll = [...productsOld, product];
        await this.writeProducts(productsAll);
        return "Producto agregado con exito"
    }

    getProducts = async () => {
        return await this.readProducts();
    }

    getProductsById = async (id) => {
        let productsById = await this.existProduct(id);
        if (!productsById) return "Producto no encontrado"
        return productsById;
    }

    updateProducts = async (id, newProduct) => {
        let productsById = await this.existProduct(id);
        if (!productsById) return "Producto no encontrado"
        await this.deleteProducts(id);
        let productsOld = await this.readProducts();
        let products = [{...newProduct, id : id}, ...productsOld];
        await this.writeProducts(products);
        return "Producto actualizado con exito"


    }


    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProduct = products.some(item => item.id === id);
        if (existProduct){
            let filterProducts = products.filter(item => item.id !== id);
            await this.writeProducts(filterProducts);
            return "Producto eliminado con exito"
        }
        return "Producto no encontrado"
    }
}

export default ProductManager;