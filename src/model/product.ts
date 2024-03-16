import { Model, Schema, ObjectId, model } from "mongoose";

interface productDocument{
    _id: ObjectId;
    name: string;
    categoryId: ObjectId;
    price: number;
    description: string;
    image: string;
    kitchenId: ObjectId;
}

const productSchema = new Schema<productDocument>({
    name:{
        type: String, 
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    kitchenId:{
        type: Schema.Types.ObjectId,
        ref: "Kitchen"
    }
}, {timestamps: true});

export default model("Product", productSchema) as Model<productDocument>;