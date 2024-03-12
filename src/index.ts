import express from 'express'
import 'dotenv/config'
import './db'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));

const PORT = 3002

app.listen(PORT, ()=>{
    console.log('Port is listening ' + PORT)
})
