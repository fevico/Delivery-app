import mongoose, { Date, Document, Schema } from 'mongoose';


export interface UserDocument extends Document {
    name: string;
    email: string;
    phone: number;
    password: string;
    passwordResetToken?: string | undefined;
    passwordResetExpires: Date | undefined;

}

const UserSchema: Schema = new Schema({
    name: {  type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date,  default: undefined }
});
// Setting expiration for passwordResetExpires field
// UserSchema.index({ passwordResetExpires: 1 }, { expireAfterSeconds:1800 } as any); // Expires in 30 minutes (1800 seconds), 

export default mongoose.model<UserDocument>('User', UserSchema);