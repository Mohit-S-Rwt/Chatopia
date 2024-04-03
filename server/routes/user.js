import express from "express";
import { login, newUser, getMyPofile, logout, searchUser } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

// After here user must be logged in to acess the features
app.use(isAuthenticated);

app.get("/me", getMyPofile);
app.get("/logout", logout);

app.get("/search", searchUser)

export default app;
