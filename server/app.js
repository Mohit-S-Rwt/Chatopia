import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";


import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import  adminRoute from "./routes/admin.js"
// import {  createUser } from "./seeders/user.js";
// import { createGroupChats, createMessages, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";



dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

// createMessagesInAChat("660d9ac85ee3a26b42e3c6d6",50)

const app = express();

// using Middlewares here

app.use(express.json()); //used to extract data from req.body (basically destturing)
app.use(cookieParser()) // to access the cookie of the logged in user

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoute);


app.get("/", (req, res) => {
  res.send(console.log("hello jiii"));
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on the ${port} `);
});
