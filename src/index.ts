import express from 'express'
import 'dotenv/config'
import './db'
import categoryRouter from './router/category';
import productRouter from './router/product'
import kitchenRouter from './router/kitchen'
import "dotenv/config";
import "./db";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));


app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/kitchen', kitchenRouter);
const PORT = 3002;

app.listen(PORT, () => {
  console.log("Port is listening " + PORT);
});
