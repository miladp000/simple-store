import express from 'express';
import dotenv from 'dotenv'
import dbConnect from './database/dbConnect.js';
import productRoutes from './routes/products.route.js';
import path from 'path'
dotenv.config();

const app = new express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use('/api/products' , productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(5000 , async()=>{
    await dbConnect();
    console.log("Server is running on http://localhost:" + port);
})