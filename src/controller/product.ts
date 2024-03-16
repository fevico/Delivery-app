import { RequestHandler } from "express"
import Product from "#/model/product";
import { createProduct, upadeProduct } from "#/@types/product";


export const addProduct: RequestHandler = async(req: createProduct, res)=>{
    const {name, categoryId, price, description, image, kitchenId } = req.body
    const product = new Product({name, categoryId, price, description, image, kitchenId})
    await product.save()
    res.json({product});
}
 
export const updateProduct: RequestHandler = async (req: upadeProduct, res) => {
    const productId = req.params
    const {name, categoryId, price, description, image} = req.body
    const product = await Product.findOneAndUpdate({productId}, {name, categoryId, price, description, image});
    if(!product) return res.status(400).json({error: "Product not found!"});
    return res.json({product})
}

export const allProduct: RequestHandler = async (req, res) =>{
    const product = await Product.find();
    if(!product) return res.status(400).json({message: "Cannot fetch products!"});
    return res.json({product})
}

export const getProductById: RequestHandler = async (req, res) =>{
    const productId = req.params;
    const product = await Product.findOne(productId)
    if(!product) return res.status(400).json({message: "Cannot get products!"});
    return res.json({product})
}

export const removeProduct: RequestHandler = async (req, res) =>{
    const productId = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if(!product) return res.status(400).json({error: "Somthing went wrong!"});
    res.json({sucess: true})
}

