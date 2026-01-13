import mongoose from "mongoose";

export const connectdb = async()=> {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected !!!")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/project-management`);
    } catch (error) {
        console.error(" Error while connecting to database: ", error);
    }
}
export default connectdb;