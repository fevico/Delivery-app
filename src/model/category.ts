import { Model, model, ObjectId, Schema } from "mongoose";

interface CategoryDocument{
    _id: ObjectId;
    name: string;
}

const categorySchema = new Schema<CategoryDocument>({
    name: {
        type: String,
        required: true
    }
})

export default model("Category", categorySchema) as Model<CategoryDocument>