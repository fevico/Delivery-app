import { RequestHandler } from "express"
import Product from "#/model/product";
import { createProduct, upadeProduct } from "#/@types/product";
import cloudinary from "#/utils/cloudinaryConfig";

export const addProduct: RequestHandler = async (req: createProduct, res) => {
    const { name, categoryId, price, description, image, kitchenId } = req.body
    try {
        if (image) {
            const uploadedImage = await cloudinary.v2.uploader.upload(image, {
                // folder: 'your_folder_name', // optional: folder in your Cloudinary account
                public_id: `${categoryId}_${name}`, //  custom public ID
                upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET // Upload preset from environment variables
            });
            if (uploadedImage) {
                const product = new Product({
                    name,
                    categoryId,
                    price,
                    description,
                    image: uploadedImage,
                    kitchenId
                })
                await product.save()
                res.json({ product });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateProduct: RequestHandler = async (req: upadeProduct, res) => {
    const productId = req.params
    const { name, categoryId, price, description, image } = req.body
    const product = await Product.findOneAndUpdate({ productId }, { name, categoryId, price, description, image });
    if (!product) return res.status(400).json({ error: "Product not found!" });
    return res.json({ product })
}

export const allProduct: RequestHandler = async (req, res) => {
    const product = await Product.find();
    if (!product) return res.status(400).json({ message: "Cannot fetch products!" });
    return res.json({ product })
}

export const getProductById: RequestHandler = async (req, res) => {
    const productId = req.params;
    const product = await Product.findOne(productId)
    if (!product) return res.status(400).json({ message: "Cannot get products!" });
    return res.json({ product })
}

export const removeProduct: RequestHandler = async (req, res) => {
    const productId = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(400).json({ error: "Somthing went wrong!" });
    res.json({ sucess: true })
}

