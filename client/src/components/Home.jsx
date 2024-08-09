import { useAppSelector } from "../store/store";
import HeroGifGreen from "../assets/Feedback-hero-green.png";
import stepsImg from "../assets/Steps.png";
import NavBar from "./Navbar";

const Home = () => {
  const WorkingData = {
    description: "Follow these steps to create your first feedback link.",
    steps: [
      "Create account or login",
      "Go to your dashboard",
      "Copy generated 'public link'",
      "Turn on 'Accepting messages'",
      "Share link to receive message on 'Dashboard' ",
    ],
  };

  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <NavBar />
      <div className="w-full h-full  bg-lighter-green-3 text-gray-800">
        <div className="flex flex-col justify-center ">
          <div className="flex lg:flex-row max-sm:flex-col justify-evenly  items-center">
            <div className="mt-20 max-sm:text-center ">
              {user ? (
                <p className="">
                  Hello,{" "}
                  <span className="font-semibold ">{user?.username} </span>{" "}
                  welcome to
                </p>
              ) : null}
              <h1 className="text-5xl font-bold mt-4">Anon Feedback</h1>
              <h1 className="text-lg max-sm:text-wrap max-sm:m-2 ">
                Honest and Anonymous Communication, Simplified
              </h1>
            </div>
            <img
              className="mt-24"
              src={HeroGifGreen}
              alt="hero-gif"
              width={350}
              loading="lazy"
            />
          </div>
          <div className="flex justify-evenly items-center mt-6 bg-lighter-green-1 pb-20">
            {user ? (
              <div className="flex flex-col justify-center items-center mt-8 gap-4">
                <div className="text-center gap-4">
                  <p className="text-2xl font-semibold mb-4">
                    Your Gateway to Honest Insights
                  </p>
                  <p className="max-w-[900px] text-s font-light">
                    You are all set to receive anonymous feedback. Click below
                    to access your dashboard, generate new links, and manage
                    your messages.
                  </p>
                </div>
                <div>
                  <a href="/dashboard">
                    <button class="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise">
                      Dashboard
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center mt-8 gap-4">
                <div className="text-center gap-4">
                  <p className="text-3xl font-semibold mb-4">
                    Get Started Today!
                  </p>
                  <p className="max-w-[900px] text-s font-normal text-sm m-3">
                    Empower yourself with candid feedback and genuine messages.
                    With True Feedback, generate a unique link, share it with
                    anyone, and receive honest, anonymous responses without
                    revealing your identity.
                  </p>
                </div>
                <div>
                  <a href="/sign-in" className="mr-4">
                    <button class="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise">
                      Sign-In
                    </button>
                  </a>
                  <a href="/sign-up">
                    <button class="px-4 py-2 text-sm rounded-large font-bold text-white border-2 border-turquoise bg-turquoise transition-all ease-in-out duration-300 hover:bg-transparent hover:text-turquoise">
                      Sign-Up
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="py-3 bg-darker-turquoise ">
          <div
            className="text-center border mx-3 rounded-lg bg-turquoise py-7  border-opacity-30
     border-gray-50 lg:flex lg:flex-row lg:justify-evenly lg:items-center lg:py-16"
          >
            <div className="lg:w-full flex flex-col justify-center items-center">
              <img src={stepsImg} alt="steps-img" width={300} />
            </div>
            <div className="lg:w-full">
              <p className="text-3xl font-semibold mt-4 text-gray-900">
                How It Works?
              </p>
              <p className="text-sm text-gray-800 ">
                {WorkingData.description}
              </p>
              <ul className="text-gray-600 w-full max-sm:mt-8">
                <li
                  className="bg-lighter-green-0 py-2 mx-2 rounded-xl shadow-lg my-2 
                hover:bg-darker-turquoise hover:text-black "
                >
                  {WorkingData.steps[0]}
                </li>
                <li
                  className="bg-lighter-green-3 py-2 mx-2 rounded-xl shadow-lg my-2 
                 hover:bg-darker-turquoise hover:text-black"
                >
                  {WorkingData.steps[1]}
                </li>
                <li
                  className="bg-lighter-green-2 py-2 mx-2 rounded-xl shadow-lg my-2 
                 hover:bg-darker-turquoise hover:text-black"
                >
                  {WorkingData.steps[2]}
                </li>
                <li
                  className="bg-lighter-green-1 py-2 mx-2 rounded-xl shadow-lg my-2 
                 hover:bg-darker-turquoise hover:text-black"
                >
                  {WorkingData.steps[3]}
                </li>
                <li
                  className="bg-light-green py-2 mx-2 rounded-xl shadow-lg my-2
                 hover:bg-darker-turquoise hover:text-black "
                >
                  {WorkingData.steps[4]}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
