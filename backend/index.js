import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import eventRoute from './routes/event.route.js' ;
dotenv.config({});


const PORT = process.env.PORT || 8000;
const app = express() ;
 

app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()) ;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
credentials: true,
allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use("/api/v1/user", userRoute);
app.use("/api/v1/event", eventRoute);

// Start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server connected at port ${PORT}`);
});
