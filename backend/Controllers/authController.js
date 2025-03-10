import User from "../Models/userModel.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

export const signUp = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const user = new User({
    name,
    email,
    password,
    confirmPassword,
  });
  const newUser = await user.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });

  return res.status(201).json({
    success: true,
    message: "User Created Successfully!",
    token,
    data: newUser,
  });
});

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new CustomError("Please provide your email and password!", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.comparePasswordInDb(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.LOGIN_EXPIRES,
    });
    return res.status(200).json({
      success: true,
      message: `Welcome Back ${user.name}!`,
      token,
    });
  }
  return next(new CustomError("Invalid email or password", 400));
});
