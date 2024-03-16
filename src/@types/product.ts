import { Request } from "express";
import { ObjectId } from "mongoose";


export interface createProduct extends Request{
    body:{
    name: string;
    categoryId: ObjectId;
    price: number;
    description: string;
    image?: string;
    kitchenId: string;
    }
}


export interface upadeProduct extends Request{
    body:{
    productId: string;
    name: string;
    categoryId: ObjectId;
    price: number;
    description: string;
    image?: string
    }
}