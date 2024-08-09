import React from "react";
import logo from "../assets/Logo-anon-feedback.jpg";
import { useAppSelector } from "../store/store";
import { logoutUserApi } from "../api/authApi";
import { toast } from "react-toastify";

const NavBar = () => {
  const user = useAppSelector((state) => state.user.user);
  const notify = toast;
  
  const handleLogout = async () => {
    const response = await logoutUserApi();

    if (response.success) {
      notify(`Welcome ${user.username}, you have successfully logged out!`);
      window.location.href = "/";
    }
  };

  return (
    <nav>
      <div className="flex justify-between lg:mx-24 mx-6 items-center bg-white">
        <a href="/">
          <img src={logo} alt="logo-trueFeedback" width={150} height={50} />
        </a>
        {user ? (
          <div className="flex space-x-4">
            <a href="/dashboard">
              <button className="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise">
                Dashboard
              </button>
            </a>

            <button
              onClick={handleLogout}
              class="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <a href="/sign-in" className="mr-4">
              <button className="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise">
                Sign-In
              </button>
            </a>
            <a href="/sign-up">
              <button class="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise">
                Sign-Up
              </button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
