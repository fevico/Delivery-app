import { Model, model, ObjectId, Schema } from "mongoose";

interface CategoryDocument{
    _id: ObjectId;
    name: string;
    kitchenId: ObjectId;
}

const categorySchema = new Schema<CategoryDocument>({
    name: {
        type: String,
        required: true
    },
    kitchenId: {
        type: Schema.Types.ObjectId,
        ref: "Kitchen",
    }
}, {timestamps: true})

export default model("Category", categorySchema) as Model<CategoryDocument>