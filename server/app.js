import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { NEW_MESSAGE } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { Message } from "./models/message.js";
// import {  createUser } from "./seeders/user.js";
// import { createGroupChats, createMessages, createMessagesInAChat, createSingleChats } from "./seeders/chat.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ijhew98hgohggffw";
const userSocketIDs = new Map();

connectDB(mongoURI);

// createMessagesInAChat("660d9ac85ee3a26b42e3c6d6",50)

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// using Middlewares here

app.use(express.json()); //used to extract data from req.body (basically destturing)
app.use(cookieParser()); // to access the cookie of the logged in user

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send(console.log("hello jiii"));
});

io.use((socket,next)=>{
  
})

io.on("connection", (socket) => {
  const user = {
    _id: "adfafg",
    name: "nago",
  };
  userSocketIDs.set(user._id.toString(), socket.id)

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      throw new Error(error);
    }
    console.log("new Message", messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server is running on the ${port} in ${envMode} Mode `);
});

export { envMode, adminSecretKey , userSocketIDs};
