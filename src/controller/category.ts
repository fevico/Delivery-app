import Category from "#/model/category";
import { RequestHandler } from "express";


export const createCategory: RequestHandler = async (req, res)=>{
    const {name, kitchenId} = req.body;
    const category = new Category({name, kitchenId});
    await category.save();
    res.json({category}); 
}

export const updateCategory: RequestHandler = async (req, res) =>{
    const {catId} = req.params;           
    const {name, kitchenId} = req.body;
    const category = await Category.findByIdAndUpdate(catId, {name, kitchenId});
    if(!category) return res.status(400).json({message: "Category not found!"})
    await category.save();
    res.json({category});
}

export const deleteCategory: RequestHandler = async (req, res) => {
    const {catId} = req.params;
    const category = await Category.findByIdAndDelete(catId);
    if(!category) return res.status(400).json({message: "Something went wrong!"});
    res.json({message: "deleted succefully!"});
}

export const getAllcategory: RequestHandler = async (req, res) =>{
    const categories = await Category.find();
    if(!categories) return res.status(400).json({message: "Cannot get categories!"});
    res.json({categories});
}

export const getCategoryById: RequestHandler = async (req, res)=>{
    const {catId} = req.params;
    const category = await Category.findById(catId);
    if(!category) return res.status(400).json({message: "Something went wrong!"});
    res.json({category});
}