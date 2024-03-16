import mongoose, { Document, Schema } from 'mongoose';


export interface UserDocument extends Document {
    name: string;
    email: string;
    phone: number;
    password: string;
}

const UserSchema: Schema = new Schema({
    name: {  type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.model<UserDocument>('User', UserSchema);