import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name."],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email."],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password."],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Enter the Confirm Password."],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password & Confirm Password must be same.",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePasswordInDb = async function (pwd, dbPwd) {
  return await bcrypt.compare(pwd, dbPwd);
};

const User = mongoose.model("User", userSchema);

export default User;
