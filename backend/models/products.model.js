import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{ type:String , required: true},
    description:{type:String , required:false},
    price:{ type:String , required: true},
    image:{ type:String , required: false}
} , {timestamps:true});
const Product = new mongoose.model('Product' , productSchema);
export default Product;