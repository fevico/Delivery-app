import Category from "#/model/category";
import Kitechen from "#/model/kitechen";
import { RequestHandler } from "express";


export const createCategory: RequestHandler = async (req, res) => {
    const { name, kitchenId } = req.body;
    const category = new Category({ name, kitchenId });
    await category.save();

    try {
        const kitchenDetails = await Category.aggregate([
            { $match: { _id: category._id } },
            {
                $lookup: {
                    from: "kitchens",
                    localField: "kitchenId",
                    foreignField: "_id",
                    as: "kitchenInfo"
                }
            },
            { $unwind: "$kitchenInfo" },
            {
                $project: {
                    _id: "$_id",
                    kitchenId: "$kitchenInfo._id",
                    kitchenName: "$kitchenInfo.name",
                    image: "$kitchenInfo.image",
                    category: "$name"
                }
            }
        ]);

        res.json({ kitchenDetails });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "An error occurred while creating category" });
    }
};


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

export const getAllCategories: RequestHandler = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found!" });
        }

        const kitchenDetails = await Category.aggregate([
            {
                $match: {
                    kitchenId: { $in: categories.map(category => category.kitchenId) }
                }
            },
            {
                $lookup: {
                    from: "kitchens",
                    localField: "kitchenId",
                    foreignField: "_id",
                    as: "kitchenInfo"
                }
            },
            {
                $unwind: "$kitchenInfo"
            },
            {
                $project: { 
                    _id: "$_id",
                    category: "$name",
                    kitchenId: "$kitchenInfo._id",
                    kitchenName: "$kitchenInfo.name",
                    image: "$kitchenInfo.image"
                }
            }
        ]);

        res.json({ kitchenDetails });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "An error occurred while fetching categories" });
    }
};


export const getCategoryById: RequestHandler = async (req, res) => {
    const { catId } = req.params;

    try {
        const category = await Category.findById(catId);
        if (!category) {
            return res.status(404).json({ message: "Category not found!" });
        }

        const kitchenDetails = await Category.aggregate([
            {
                $match: { _id: catId }
            },
            {
                $lookup: {
                    from: "kitchens",
                    localField: "kitchenId",
                    foreignField: "_id",
                    as: "kitchenInfo"
                }
            },
            {
                $unwind: "$kitchenInfo"
            },
            {
                $project: {
                    _id: 1,
                    category: "$name",
                    kitchenId: "$kitchenInfo._id",
                    kitchenName: "$kitchenInfo.name",
                    image: "$kitchenInfo.image"
                }
            }
        ]);

        if (!kitchenDetails || kitchenDetails.length === 0) {
            return res.status(404).json({ message: "Kitchen details not found for this category!" });
        }

        res.json({ category: kitchenDetails[0] });
    } catch (error) {
        console.error("Error fetching category details:", error);
        res.status(500).json({ message: "An error occurred while fetching category details" });
    }
};
