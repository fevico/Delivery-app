import express from 'express'
import 'dotenv/config'
import './db'
import categoryRouter from './router/category'
import authRoute from './router/authRoute'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));


app.use('/categories', categoryRouter);
app.use('/api/auth', authRoute);


const PORT = 3002

app.listen(PORT, ()=>{
    console.log('Port is listening ' + PORT)
})
