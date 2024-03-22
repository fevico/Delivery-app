import mongoose, { Date, Document, Schema } from "mongoose";

export interface UserDocument extends Document {
<<<<<<< Updated upstream
    name: string;
    email: string;
    role: UserRole;
    phone: number;
    password: string;
    passwordResetToken?: string | undefined;
    passwordResetExpires: Date | undefined;

}

enum UserRole {
    Restaurant = 'restaurant',
    Rider = 'rider',
    User = 'user'
  }

const UserSchema: Schema = new Schema({
    name: {  type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date,  default: undefined }
});
// Setting expiration for passwordResetExpires field
// UserSchema.index({ passwordResetExpires: 1 }, { expireAfterSeconds:1800 } as any); // Expires in 30 minutes (1800 seconds), 

const User = mongoose.model<UserDocument>('User', UserSchema);
=======
  name: string;
  email: string;
  role: UserRole;
  phone: number;
  password: string;
  passwordResetToken?: string | undefined;
  passwordResetExpires: Date | undefined;
}

enum UserRole {
  Admin = "admin",
  User = "user",
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: Object.values(UserRole), default: "user" },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date, default: undefined },
});

const User = mongoose.model<UserDocument>("User", UserSchema);
>>>>>>> Stashed changes
export { User, UserRole };
