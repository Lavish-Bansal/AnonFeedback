import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import signUpImg from "../assets/Sign_up-amico.png";
import { registerApi } from "../api/authApi";
import { useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/user.slice";
import { toast } from "react-toastify";

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const reqBody = {
      username,
      email,
      password,
    };

    const resRegisterApi = await registerApi(reqBody);

    if (resRegisterApi.success) {
      dispatch(setUser(resRegisterApi.data));
      toast.success(
        `Welcome ${resRegisterApi.data.username}, you have successfully registered!`
      );
      navigate(`/dashboard`);
    } else {
      toast.error(`${resRegisterApi.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col bg-lighter-green-1 h-full lg:flex-row lg:px-40 px-10 min-h-screen">
        <div className="my-8 text-center text-gray-700 flex flex-col justify-center items-center w-full lg:mt-8">
          <p className="text-3xl font-bold my-3 text-darker-turquoise">
            Join True Feedback Today!
          </p>
          <p className="text-[25px] font-semibold">Create Your Account</p>
          <p className="text-[15px] mb-5">
            Sign up to start receiving feedback and insights.
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
                Username
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="rounded-large block w-full p-2 bg-lighter-green-3"
                placeholder="Please enter username"
                required="true"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="px-2 py-1 font-light">
                This username will be your public display username.
              </span>
            </div>
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
                placeholder="Please enter Email"
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
                  <div className="m-2 h-4 w-4 animate-spin " /> Please wait
                </>
              ) : (
                "Create your account"
              )}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-sm text-center mb-2 text-gray-700 p-1">
              Already have an account?
            </p>
            <button
              type="submit"
              onClick={() => navigate("/sign-in")}
              className="w-full bg-transparent hover:bg-lighter-green-2 border
             border-darker-turquoise mb-24 text-gray-800 p-2"
            >
              Sign-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
