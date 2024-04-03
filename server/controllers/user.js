import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { tryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// create a new user and save it to database and save it in cookie
const newUser = async (req, res, next) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);
  const avatar = {
    public_id: "sdfs",
    url: "asdfa",
  };
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created");

  // res.status(201).json({ message: "User created successfully" });
};

// Login user and save token in cookie

const login = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  console.log(username);
  console.log(password);

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `${user.name} Logged in successfully`);
});

const getMyPofile = tryCatch(async (req, res,next) => {
  const user = await User.findById(req.user);
  if(!user) return next(new ErrorHandler("User not Found",404))

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = tryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chattu-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: " Logged out successfully",
    });
});


const searchUser = tryCatch(async (req, res) => {
const {name} = req.query;


  return res
    .status(200)
    .cookie("chattu-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: name,
    });
});

export { login, newUser, getMyPofile, logout, searchUser };
