import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {CORS_ORIGIN} from "./constants.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,

}));

app.use("/api/v1/auth", authRouter);

export { app };
