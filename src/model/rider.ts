import { compare, hash } from "bcrypt";
import { Model, model, Schema, ObjectId } from "mongoose";

enum ShiftPreference {
    Morning = 'morning',
    Afternoon = 'afternoon',
    Evening = 'evening',
}

enum DayOfAvailability {
    Monday = 'monday',
    Tuesday = 'tuesday',
    Wednesday = 'wednesday',
    Thursday = 'thursday',
    Friday = 'friday',
    Saturday = 'saturday',
    Sunday = 'sunday',
}

interface RiderDocument {
    _id: ObjectId;
    email: string;
    name: string;
    password: string;
    dateOfBirth: Date;
    availability: {
        shiftPreferences: ShiftPreference[]; // Morning, Afternoon, Evening
        daysOfAvailability: DayOfAvailability[]; // Monday-Sunday
    };
    rating: number;
    employeeId: string;
    emergencyContact: string;
    vehicleType: string;
    licenseNumber: string;
    phone: string;
    address: string;
    status: "pending" | "active" | "inactive";
}

interface RiderMethods {
    comparePassword(password: string): Promise<boolean>;
}

const riderSchema = new Schema<RiderDocument>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    availability: {
        type: {
            shiftPreferences: { type: [String], enum: Object.values(ShiftPreference) },
            daysOfAvailability: { type: [String], enum: Object.values(DayOfAvailability) },
        },
    },
    rating: { type: Number },
    emergencyContact: { type: String },
    employeeId: { type: String },
    vehicleType: { type: String },
    licenseNumber: { type: String },
    phone: { type: String, required: true },
    address: { type: String },
    status: { type: String, required: true, default: "pending" }
});

riderSchema.pre('save', async function (next) {
    // Hash the password
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10);
    }
    next();
});

riderSchema.methods.comparePassword = async function (password)  {
    const result = await compare(password, this.password);
    return result;
};

export default model("Rider", riderSchema) as Model<RiderDocument, {}, RiderMethods>;
