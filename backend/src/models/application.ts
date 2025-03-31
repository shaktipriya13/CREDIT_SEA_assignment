// import mongoose from "mongoose";

// const ApplicationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   status: { type: String, enum: ["pending", "verified", "approved", "rejected"], default: "pending" },
//   amount: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Application", ApplicationSchema);
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "verified", "approved", "rejected", "disbursed"], default: "pending" }
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
