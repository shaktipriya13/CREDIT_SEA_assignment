import mongoose, { Schema, Document } from "mongoose";

// Define an interface for TypeScript type safety
export interface IUser extends Document {
  username: string;
  password: string;
  role: "admin" | "verifier" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "verifier", "user"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the model
export default mongoose.model<IUser>("User", userSchema);
