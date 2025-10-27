import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';



const app = express();

app.use(cors(

));

mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log("Successfully connected to the Database")
    }
).catch(
    ()=>{
        console.log("Error occured,Database Connection failed")
    }
)

//middlewares
app.use(bodyParser.json());
app.use(verifyJWT);


//API endpoints
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);

app.listen(3000,
    ()=>{
        console.log("Server is running on port 3000");
    }
)
