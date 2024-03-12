import mongoose from "mongoose";

const URI = process.env.MONGO_URI as string

mongoose.set('strictQuery', true);

mongoose.connect(URI).then(()=>{
    console.log('db is connected')
}).catch((err)=>{
    console.log('db conection failed', err)
});