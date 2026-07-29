import mongoose from "mongoose";

const dbConnect = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDb Connected: ",conn.connection.host);
    }
    catch(err){
        console.error("Error Connect to Database: " , err.message);
        process.exit(1);
    }
}
export default dbConnect