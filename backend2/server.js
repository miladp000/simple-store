import express from 'express'
import connectToMongo from './database/db.js'
import dotenv from 'dotenv';
import Product from './models/product.model.js';
dotenv.config();
const app = new express();

app.use(express.json())

app.post('/api/products' , async (req,res)=>{
    const newProduct = req.body;
    if(!newProduct.name || !newProduct.price || !newProduct.image){
        return res.status(400).json({success:false , message:"Please Provede All Fields"});
    }
    const product = new Product(newProduct);
    try{
        await product.save();
        return res.status(201).json({success:true , data:product});
    }
    catch(error){
        return res.status(500).json({success:false , message:error.message})
    }
})

app.listen(5000, ()=>{
    connectToMongo();
    console.log(`server s running on http://localhost:5000`);
})