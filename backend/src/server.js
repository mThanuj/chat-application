import {app} from './app.js'
import express from "express";
import authRouter from "./routes/authRoutes.js"
import {PORT} from "./constants.js";

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auth',authRouter);



app.listen(PORT,()=>{
    console.log(`Server started on port ${port}`)
})