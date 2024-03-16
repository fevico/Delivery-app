import { Model, model, Schema, ObjectId } from "mongoose";

interface kitchenDocument {
    _id: ObjectId;
    name: string;
    image: string;
    description: string;
    startTime: string;
    endTime: string;
    tags: [string]
}

const kitchenSchema = new Schema<kitchenDocument>({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    tags: {
        type: [String]
    }
}, {timestamps: true})

export default model("Kitchen", kitchenSchema) as Model<kitchenDocument>