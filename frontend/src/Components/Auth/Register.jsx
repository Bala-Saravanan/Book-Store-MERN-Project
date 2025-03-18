import { useState } from "react";
import { Button } from "../UI/Button";
import { Input } from "../UI/input";
import { Label } from "../UI/label";
import axios from "axios";
import { USER_API_END_POINT } from "../../Constants/constants";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/signup`,
        userInput
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="relative flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-[#5B5A4D]"></div>

      {/* Right Side */}
      <div className="w-1/2 bg-[#EAD4C0] flex justify-center items-center"></div>
      {/* Form Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className=" w-[500px] bg-white shadow-2xl rounded-2xl p-10">
          <p className="text-center text-2xl font-bold mb-4">
            Create Your Account
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <Label>Name: </Label>
              <Input
                type="text"
                name="name"
                value={userInput.name}
                onChange={changeHandler}
                placeholder="Enter Your Name..."
              />
            </div>
            <div>
              <Label>Email: </Label>
              <Input
                type="email"
                name="email"
                value={userInput.email}
                onChange={changeHandler}
                placeholder="Enter Your Email..."
              />
            </div>
            <div>
              <Label>Password: </Label>
              <Input
                type="password"
                name="password"
                value={userInput.password}
                onChange={changeHandler}
                placeholder="Enter Your Password..."
              />
            </div>
            <div>
              <Label>Confirm Password: </Label>
              <Input
                type="password"
                name="confirmPassword"
                value={userInput.confirmPassword}
                onChange={changeHandler}
                placeholder="Enter Your Password..."
              />
            </div>
          </div>

          <div className="flex justify-center mt-7">
            <Button
              onClick={submitHandler}
              type="submit"
              className="cursor-pointer bg-[#D5B8A4] hover:bg-[#c5a08f] text-secondary py-2 px-6 rounded-lg"
            >
              Sign Up
            </Button>
          </div>
          <p className="mt-5 text-secondary">
            Already have an acount? Kindly{" "}
            <Link className="text-primary underline" to={"/login"}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
