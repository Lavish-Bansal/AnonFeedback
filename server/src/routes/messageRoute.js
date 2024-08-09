import { Router } from "express";
import { acceptMessage, deleteUserMessage, getMessageByUser, getUser, sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/getUser/:userId').get(getUser);
router.route('/send/:userId').post(sendMessage);
router.route('/getMessages/:userId').get(getMessageByUser);
router.route('/deleteMessage/:messageId').delete(verifyJWT, deleteUserMessage);
router.route('/acceptMessage').post(verifyJWT, acceptMessage);

export default router;