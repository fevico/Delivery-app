import express from 'express'
import 'dotenv/config'
import './db'
<<<<<<< Updated upstream
import productRouter from './router/product'
import kitchenRouter from './router/kitchen'
import categoryRouter from './router/category'
import authRoute from './router/authRoute'
=======
import authRoute from './router/authRoutes'
import categoryRouter from "./router/category";
import kitchenRoute from "./router/kitchen";
>>>>>>> Stashed changes
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
app.use('/api/auth', authRoute);
app.use('/kitchen', kitchenRoute);

app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/kitchen', kitchenRouter);
const PORT = 3002;


app.listen(PORT, () => {
  console.log("Port is listening " + PORT);
});
