import { body, validationResult, check, param, query } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", "); // now the erorr mesg will be in string rather then string
  //   console.log(errorMessages);
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please Enter your name").notEmpty(),
  body("username", "Please Enter your username").notEmpty(),
  body("bio", "Please Enter your Bio").notEmpty(),
  body("password", "Please Enter your password").notEmpty(),
  check("avatar", "Please upload Avatar").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter your username").notEmpty(),

  body("password", "Please Enter your password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please Enter your name").notEmpty(),

  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter Chat Id").notEmpty(),

  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter Chat Id").notEmpty(),
  body("userId", "Please Enter User Id").notEmpty(),
];


const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter Chat Id").notEmpty(),
  check("files")
    .notEmpty()
    .withMessage("Please upload Attachments")
    .isArray({ min: 1, max: 5 })
    .withMessage("Attachments must be between 1 - 5"),
];

const chatIdValidator = () => [
    param("id", "Please Enter Chat Id").notEmpty(),
   
  ];

  const renameValidator = () => [
    param("id", "Please Enter Chat Id").notEmpty(),
    body("name", "Please Enter New Name").notEmpty(),
   
  ];

 

  

export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  chatIdValidator,
  renameValidator
};