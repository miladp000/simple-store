import mongoose from 'mongoose';

const connectToMongo = async()=>{
    try{
     const conn = await mongoose.connect(process.env.MONGODB_URL)
     console.log("mongoDB Connected: " , conn.connection.host);
    }
    catch(error){
        console.log("Error: " , error.message);
        process.exit(1);
    }
}
export default connectToMongo;