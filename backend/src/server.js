
import {app} from './app.js'
import express from "express";
import authRouter from "./routes/authRoutes.js"
import { connectDB } from "./db/index.js";
import {PORT} from "./constants.js";

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auth',authRouter);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB Connection error: ${err}`);
  });
