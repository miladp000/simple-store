import Product from '../models/products.model.js'
import mongoose from 'mongoose';

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        return res.status(200).json({success:true , data:products});
    } catch (error) {
        return res.status(500).json({success:false , message:error.message});
    }
};
export const createProduct = async (req,res)=>{
    console.log(req.body);
    const product= req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false , message:"Please provide all fields"});
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(201).json({success:true , data:newProduct});
    } catch (error) {
        console.error("Error in save to database: " , error.message);
        return res.status(500).json({success:false , message:error.message});
    }
};
export const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({success:false , message:"Invalid Information"});
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(deletedProduct !== null) {return res.status(200).json({success:true , data:deletedProduct})}
        else{return res.status(404).json({success:false , message:"The id is Repetitive !"});}
    } catch (error) {
        return res.status(500).json({success:false , message:error.message});
    }
};
export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.isValidObjectId(id)){
        return res.status(404).json({success:false , message:"Invalid Information"});
    }
    try{
        const newProduct = await Product.findByIdAndUpdate(id , product , {new:true} )
        return res.status(200).json({success: true , data:newProduct});
    }
    catch(error){
        return res.status(500).json({success:false , message:error.message});
    }
}