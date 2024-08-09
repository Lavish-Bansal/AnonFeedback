import { toast } from "react-toastify";
import React, { useCallback, useEffect, useState } from "react";
import DashboardImage from "../assets/Analyze-pana.png";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  acceptMessageApi,
  deleteUserMessagesApi,
  getUserMessagesApi,
} from "../api/messageApi";
import { getUserApi } from "../api/authApi";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Copy");
  const User = useAppSelector((state) => state.user.user);
  const [user, setUser] = useState(User);

  const notify = toast;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // If user is null, fetch user data using the token
    const fetchUserData = async () => {
      try {
        const data = await getUserApi();
        if (data.success) {
          dispatch(setUser(data.data));
          setUser(data.data);
        } else {
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        navigate("/sign-in");
      }
    };

    if (!user) {
      fetchUserData();
    }
  }, [user, dispatch, navigate]);

  const fetchAcceptMessage = useCallback(async () => {
    try {
      const response = await acceptMessageApi();
      dispatch(setUser(response.data.updatedUser));
    } catch (error) {
      console.error(error);
    }
  }, []); // eslint-disable-line

  const fetchMessages = useCallback(
    async (refresh) => {
      setIsLoading(true);

      try {
        const response = await getUserMessagesApi(user._id);

        if (response.success) setMessages(response.whispers || []);

        if (refresh) {
          notify("Refreshed Messages!! Showing latest messages");
        }
      } catch (err) {
        toast.error("Failed to fetch messages");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages, toast] // eslint-disable-line
  );

  const deleteUserMessage = async (messageId) => { //eslint-disable-line
    setIsLoading(true);
    if (user) {
      const res = await deleteUserMessagesApi(messageId);
      if (!res.success) {
        console.error(res.message);
      } else {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
      }
    }
  };

  // fetch initial state from the server
  useEffect(() => {
    if (!user) navigate("/");
    fetchMessages();
  }, [user, fetchMessages]); // eslint-disable-line

  const username = user?.username || null;
  const baseURL = `${window.location.protocol}//${window.location.host}`;
  const profileURL = `${baseURL}/user-client/${username}`;

  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      notify(`Clipboard API not available!`, {
        appearance: "success",
      });
      return;
    }

    navigator.clipboard
      .writeText(profileURL)
      .then(() => {
        notify(`URL Copied`, { appearance: "success" });
        setButtonText("Copied!");
        setTimeout(() => setButtonText("Copy"), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <Navbar />
      {user ? (
        <div className="bg-lighter-green-0 min-h-screen max-h-full w-full">
          <div
            className="my-8 md:mx-8 lg:mx-auto p-6 bg-lighter-green-0 rounded w-full max-w-6xl 
                    min-h-screen max-h-full mt-3"
          >
            <div className="flex lg:items-center justify-between max-md:flex-col ">
              <div>
                <p className="text-2xl font-semibold text-gray-600">
                  Hello, <span className="italic">{username} </span>
                </p>
                <p className="text-sm text-gray-500">Welcome to </p>
                <h1 className="text-4xl font-bold mb-4 mt-3 text-darker-turquoise">
                  User Dashboard
                </h1>
              </div>
              <img
                src={DashboardImage}
                alt="DashBoardImage"
                width={350}
                className="lg:mr-24 max-md:ml-5"
              />
            </div>

            <div className="mb-4 bg-lighter-green-1 p-5 rounded-lg">
              <h2 className="text-lg font-semibold mb-1 text-gray-700">
                Copy Your Unique Link
              </h2>{" "}
              <p className="mb-3 text-sm">
                Share this link to recive messages{" "}
              </p>
              <div className="flex items-center">
                <input
                  type="text"
                  value={profileURL}
                  disabled
                  className={`w-full p-2 mr-2 bg-gray-100 rounded-md 
          ${buttonText === "Copied!" ? "bg-lighter-green-4" : null}`}
                />
                <button type="submit" onClick={copyToClipboard}>
                  {buttonText}
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center ">
              <Switch
                onChange={fetchAcceptMessage}
                checked={user.isAcceptingMessages}
              />
              <span className="ml-2 ">
                Accept Messages: {user.isAcceptingMessages ? "On" : "Off"}
              </span>
            </div>

            <button
              className="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                fetchMessages(true);
              }}
            >
              <p className="">
                <span>{isLoading ? "Refreshing" : "Refresh"}</span> Messages
              </p>
            </button>

            <div className="py-6 bg-lighter-green-0 min-h-screen">
              <h1 className="text-2xl font-bold mb-4">Messages</h1>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
                  >
                    <p className="text-lg">{message}</p>
                    {/* <button
                    onClick={() => deleteUserMessage(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Dashboard;
