import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import signUpImg from "../assets/Login-Image.png";
import { authApi } from "../api/authApi";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/user.slice";
import { toast } from "react-toastify";

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const reqBody = {
      email,
      password,
    };

    const resAuthApi = await authApi(reqBody);

    if (resAuthApi.success) {
      dispatch(setUser(resAuthApi.data.user));

      toast.success(`Welcome ${resAuthApi.data.user.username}, you're logged in!`, {
        appearance: "success",
      });
      navigate(`/dashboard`);
    } else {
      toast.error(`${resAuthApi.message}`, {
        appearance: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col bg-lighter-green-1 h-full lg:flex-row lg:px-40 px-10 min-h-screen">
        <div className="my-8 text-center text-gray-700 flex flex-col justify-center items-center w-full lg:mt-8">
          <p className="text-3xl font-bold my-3 text-darker-turquoise">
            Welcome Back!
          </p>
          <p className="text-[25px] font-semibold">Log in to Your Account</p>
          <p className="text-[15px] mb-5">
            Access your dashboard and manage your feedback.
          </p>
          <img src={signUpImg} alt="sign-up-Img" width={300} />
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="rounded-large block w-full p-2 bg-lighter-green-3"
                placeholder="Please enter Username/Email"
                required="true"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
                className=" rounded-large block w-full p-2 bg-lighter-green-3"
                required="true"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div
              onClick={togglePassword}
              className="text-center cursor-pointer px-1 py-0 relative w-full"
            >
              {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>

            <button
              type="submit"
              className="w-full bg-darker-turquoise hover:bg-turquoise block p-2"
            >
              {isLoading ? (
                <>
                  <div className="m-2 h-2 w-4 animate-spin " /> Please wait
                </>
              ) : (
                "Sign-in"
              )}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-sm text-center mb-2 text-gray-700 p-1">
              Do not have an account?
            </p>
            <button
              type="submit"
              onClick={() => navigate("/sign-up")}
              className="w-full bg-transparent hover:bg-lighter-green-2 border
             border-darker-turquoise mb-24 text-gray-800 p-2"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
