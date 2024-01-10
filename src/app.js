import express from 'express';
import ProductRouter from './routes/products.js';
import CartRouter from './routes/carts.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter)



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);