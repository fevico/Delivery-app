
import express from "express";
import "dotenv/config";
import "./db";
import authRoute from "./router/authRoutes";
import categoryRouter from "./router/category";
import kitchenRouter from "./router/kitchen";
import productRouter from "./router/product";
import riderRouter from "./router/rider";

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

app.use("/categories", categoryRouter);
app.use("/api/auth", authRoute);
app.use("/products", productRouter);
app.use("/kitchen", kitchenRouter);
app.use("/rider", riderRouter);


const PORT = 3002;

app.listen(PORT, () => {
  console.log("Port is listening " + PORT);
});
