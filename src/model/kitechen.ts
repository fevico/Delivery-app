import { compare, hash } from "bcrypt";
import { Model, model, Schema, ObjectId } from "mongoose";

interface kitchenDocument {
    _id: ObjectId;
    email: string;
    password: string;
    name: string;
    image: string;
    description: string;
    startTime: string;
    endTime: string;
    status: "pending" | "active" | "inactive";
    tags: [string]
}

interface UserMethods {
    comparePassword(password: string): Promise<boolean>;
  }
  const kitchenSchema = new Schema<kitchenDocument, UserMethods>({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
    },
    password: {
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
    status:{
        type: String,
        default: "pending"
    },
    tags: {
        type: [String],
        // Example: If tags are required, use required: true
        // required: true,
    }
}, { timestamps: true });


kitchenSchema.pre('save', async function (next) {
    // Hash the password
    if (this.isModified("password")) {
      this.password = await hash(this.password, 10); 
    }
    next();
  });
  
  kitchenSchema.methods.comparePassword = async function (password) {
    const result = await compare(password, this.password);
    return result;
  };

export default model("Kitchen", kitchenSchema) as Model<kitchenDocument, {}, UserMethods>