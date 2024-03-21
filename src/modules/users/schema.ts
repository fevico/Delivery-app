import mongoose, { Date, Document, Schema } from 'mongoose';


export interface UserDocument extends Document {
    name: string;
    email: string;
    role: UserRole;
    isAdmin: boolean,
    phone: number;
    password: string;
    passwordResetToken?: string | undefined;
    passwordResetExpires: Date | undefined;

}

enum UserRole {
    Admin = 'admin',
    User = 'user'
  }

const UserSchema: Schema = new Schema({
    name: {  type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(UserRole), default: 'user' },
    isAdmin: {
        type: Boolean,
        default: false,
      },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date,  default: undefined }
});


const User = mongoose.model<UserDocument>('User', UserSchema);
export { User, UserRole };
