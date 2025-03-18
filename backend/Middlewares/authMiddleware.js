import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";
import util from "util";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

export const protectedRoutes = asyncErrorHandler(async (req, res, next) => {
  const testToken = req.headers.authorization;
  // console.log("token: " + testToken);
  let token;
  if (testToken && testToken.startsWith("bearer")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    return next(new CustomError("You are not logged in!", 401));
  }
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  console.log("decoded token: " + decodedToken);
  const user = await User.findById(decodedToken.id);
  req.user = user.id;

  // console.log("User " + user);
  // console.log("User Id: " + req.user);
  if (!req.user) {
    return next(
      new CustomError("The User with the given token does not exists!", 401)
    );
  }
  next();
});
