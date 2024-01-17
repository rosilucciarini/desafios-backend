const express = require('express');
const app = express();
const exphbs = require("express-handlebars");

const productsRouter = require("./routes/products.js");
const cartsRouter = require("./routes/carts.js")
const viewsRouter = require("./routes/views.router.js");
const port = 8080;

//Middleware
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(".src/public"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});