import React, { useState } from "react";
import { toast } from "react-toastify";
import logo from "../assets/Logo-anon-feedback.jpg";
import HeroGifGreen from "../assets/Email-campaign-pana-dark.png";
import { sendMessageApi } from "../api/messageApi";
import { useParams } from "react-router-dom";

const SendMessage = () => {
  // const dispatch = useAppDispatch();
  const { userId } = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (userId) {
        const res = await sendMessageApi(userId, message);
        if (res && res?.success) {
          toast.success(`Message sent successfully!`);
        } else {
          toast.error(res?.message);
        }
      }
      setIsLoading(false);
      setMessage("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-lighter-green-0 w-full min-h-screen max-h-full">
      <div className="container mx-auto py-8 p-6 bg-lighter-green-0 rounded max-w-4xl min-h-screen">
        <div className="flex flex-col lg:flex-row items-center lg:justify-evenly ">
          <div className="flex flex-col items-center ">
            <p className="text-center text-lg">Welcome to </p>
            <h1 className="text-4xl font-bold mb-2 text-center">
              Public Profile of
            </h1>
            <img src={logo} alt="Public Profile Img" width={200} />
          </div>
          <img src={HeroGifGreen} alt="Public Profile Img" width={350} />
        </div>
        <div
          className="space-y-6 mt-6 bg-turquoise 
            p-4 rounded-md"
        >
          <div className="text-md font-bold py-1 rounded-md">
            Send Anonymous Message to &nbsp;
            <span className="">{userId}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              placeholder="Write your anonymous message here"
              className="resize-none block w-full px-2 py-4 rounded-large"
              onChange={(e) => setMessage(e.target.value)}
              required="true"
            />
            <div className="flex justify-center py-4">
              {isLoading ? (
                <button
                  disabled
                  className="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise"
                >
                  {/* <Loader2 className="mr-2 h-4 w-4 animate-spin " /> */}
                  Please wait
                </button>
              ) : (
                <button
                  className="px-4 py-2 text-sm rounded-large font-bold text-turquoise border-2 border-turquoise bg-white transition-all ease-in-out duration-300 hover:bg-lighter-green-3 hover:text-turquoise"
                  type="submit"
                  disabled={isLoading}
                >
                  Send It
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="text-center py-8  ">
          <div className="mb-4">Get Your Message Board</div>
          <a href={"/sign-up"}>
            <button className="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise">
              Create Your Account
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
