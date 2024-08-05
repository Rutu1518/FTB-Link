import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import { postLink, getRedirectlink } from "./Controllers/Link.js";
import {postSignup, postLogin } from "./Controllers/User.js";

const app = express();
app.use(cors());
app.use(express.json());

const MongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`Connection Failed`, error);
  }
};
MongoDB();

app.get("/health", (req, res) => {
  res.json({
    message: "Server is running",
    success: true,
  });
});

app.post("/link", postLink);
app.get("/:slug", getRedirectlink);
app.post("/signup", postSignup);
app.post("Login", postLogin);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
