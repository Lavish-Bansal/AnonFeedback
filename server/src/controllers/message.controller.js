import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   throw new ApiError(400, "Invalid URL");
    // }

    const user = await User.findOne({ username: userId });
    // return res.status(200).send({ success: true, user });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL",
      });
    }

    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { userId } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   throw new ApiError(400, "User not found");
    // }

    const user = await User.findOne({ username: userId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isAcceptingMessages) {
      return res.status(500).json({
        success: false,
        message: "User is not accepting messages at this time!!",
      });
    }

    const message = await Message.create({ content });
    await message.save();

    user.message.push(message._id);
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Message sent successfully"));
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Message not sent",
    });
  }
};

export const getMessageByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const messages = user.message;

    if (messages && messages.length > 0) {
      try {
        const contentPromises = messages.map(async (messageId) => {
          const content = await Message.findById(messageId.toString());
          if (content) {
            return content.content;
          }
          return null;
        });

        const resolvedContents = await Promise.all(contentPromises);

        const whispers = resolvedContents.filter((content) => content !== null);

        return res.status(200).json({ success: true, whispers });
      } catch (error) {
        // console.error("Error fetching messages:", error);
        return res
          .status(500)
          .json({ success: false, message: "Unable to fetch messages" });
      }
    } else {
      return res.status(200).json({
        success: true,
        whispers: [],
      });
    }
  } catch (error) {
    // console.error("Error in getMessageByUser:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteUserMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      throw new ApiError(400, "Invalid whisper");
    }

    // Step 1: Remove the message ID from the user's messages array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { messages: messageId } },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
      return;
    }

    console.log("Updated user:", user);

    const message = await Message.findByIdAndDelete(messageId);
    if (message) {
      res.status(200).send({
        success: true,
        message: "Message deleted",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Message not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const acceptMessage = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const acceptMessage = user.isAcceptingMessages;
  user.isAcceptingMessages = !acceptMessage;
  await user.save({ ValidateBeforeSave: false });

  const updatedUser = await User.findById(req.user._id).select(
    "-password -message"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { updatedUser }, "Updated accepting messages"));
};
