import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
  httpOnly: true,
  sameSite: "lax",
  secure: true,
};

// Registering a new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((fields) => fields?.trim() === "")) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existedUsername = await User.findOne({ username });

  if (existedUsername) {
    return res.status(400).json({
      success: false,
      message: "User with username is already present",
    });
  }

  const existedEmail = await User.findOne({ email });

  if (existedEmail) {
    return res.status(400).json({
      success: false,
      message: "User with email is already present",
    });
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while created the user",
    });
  }

  const accessToken = await user.generateAccessToken();

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password is required",
    });
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Incorrect email or password",
    });
  }

  const accessToken = await user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

// Logout user
const logoutUser = asyncHandler(async (_, res) => {
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetch successfully"));
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
