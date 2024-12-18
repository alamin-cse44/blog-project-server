import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
 },
{
    timestamps: true, 
}
);



 export const User = model<IUser>("User",userSchema)