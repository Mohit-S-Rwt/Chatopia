import { body, param, validationResult } from "express-validator";
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
 
];

const chatIdValidator = () => [param("id", "Please Enter Chat Id").notEmpty()];

const renameValidator = () => [
  param("id", "Please Enter Chat Id").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter User Id ").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please Enter request Id ").notEmpty(),
  body("accept", "Please Add Accept ")
    .notEmpty().withMessage("Please Add Accept ")
    .isBoolean()
    .withMessage("Accept must be A boolean"),
];

const adminLoginValidator = ()=>[
  body("secret Key", "Please Enter Request ID").notEmpty(),
]

export {
  acceptRequestValidator, addMemberValidator, adminLoginValidator, chatIdValidator, loginValidator,
  newGroupValidator, registerValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, sendRequestValidator, validateHandler
};

