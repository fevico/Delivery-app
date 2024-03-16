import { RequestHandler } from "express";
import Kitechen from "#/model/kitechen";
import { isValidObjectId } from "mongoose";

export const createKitchen: RequestHandler = async (req, res) =>{
    const {name, description, image, startTime, endTime, tags} = req.body
    const kitchen = await Kitechen.findOne({name});
    if(kitchen) return res.status(400).json({message: "Kitchen already exist!"});
    const newKitchen = new Kitechen({name, description, image, startTime, endTime, tags});
    await newKitchen.save();
    return res.json({newKitchen}); 
}

export const getAllKitchens: RequestHandler = async (req, res) =>{
    const kitchens = await Kitechen.find();
    if(!kitchens) return res.status(400).json({message: "Cannot find kitchens!"});
    return res.json({kitchens})
}

export const getKitchenById: RequestHandler = async (req, res) =>{
    const {kitchenId} = req.params;
    const kitchen = await Kitechen.findById(kitchenId);
    if(!kitchen) return res.status(400).json({message: "Cannot find kitchen!"});
    return res.json({kitchen})
}

export const updateKitchen: RequestHandler = async (req, res) => { 
    const {kitchenId} = req.params;
    const {name, description, image, startTime, endTime, tags} = req.body;
    if(!isValidObjectId(kitchenId)) return res.status(400).json({message: "Invalid kitchen id!"})
    const kitchen = await Kitechen.findByIdAndUpdate(kitchenId, {name, description, image, startTime, endTime, tags }, {new: true})
    if(!kitchen) return res.status(400).json({message: "Something went wrong!"})
    return res.json({kitchen}) 
}