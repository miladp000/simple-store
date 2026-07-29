import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './database/dbConnect.js';
import productRoutes from './routes/products.route.js'
dotenv.config();

const app = new express();
app.use(express.json());
app.use('/api/products' , productRoutes)
const port = process.env.PORT || 5000;

app.listen(5000 , async()=>{
    await dbConnect();
    console.log("Server is running on http://localhost:" + port);
})