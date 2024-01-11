const express = require('express');
const app = express();

const productsRouter = require("./routes/products.js");
const cartsRouter = require("./routes/carts.js")
const port = 8080;

//Middleware
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

//Rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter)


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});