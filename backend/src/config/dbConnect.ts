// import mongoose from "mongoose";

// const dbConnect = async (): Promise<void> => {
//     try {
//         const connect = await mongoose.connect(process.env.CONNECTION_STRING as string);
//         console.log(`Database connected: ${connect.connection.host}, ${connect.connection.name}`);
//     } catch (error) {
//         console.error("Database connection error:", error);
//         process.exit(1);
//     }
// };

// export default dbConnect;
import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
    try {
        const connectionString = process.env.CONNECTION_STRING;
        if (!connectionString) {
            throw new Error("Missing CONNECTION_STRING in environment variables.");
        }

        mongoose.set("strictQuery", false); // Prevents deprecated queries
        const connect = await mongoose.connect(connectionString);

        console.log(`✅ Database connected successfully: ${connect.connection.host}`);
    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1); // Exits the process on failure
    }
};

export default dbConnect;
