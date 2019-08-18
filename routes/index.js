import express from "express";

import { signup, login } from "../controllers/auth.controller";
import checkToken from "../middlewares/authMiddleware";
import {
	createContact,
	getAll,
	getOne,
	updateContact,
	deleteContact,
} from "../controllers/contact.controller";
import {
	createMessage,
	getAllMessages,
	updateMessage,
	deleteMessage,
	getOneMessage,
} from "../controllers/message.controller";
import {
	phoneNumberValidator,
	receiverValidator,
	textValidator,
	userNameValidator,
} from "../middlewares/validatorMiddleware";

const router = express.Router();

// auth
router.post("/register", signup);
router.post("/login", login);

// contacts
router.post(
	"/contact",
	checkToken,
	phoneNumberValidator,
	userNameValidator,
	createContact,
);
router.get("/contact", checkToken, getAll);
router.get("/contact/:phoneNumber", checkToken, getOne);
router.put(
	"/contact/:phoneNumber",
	checkToken,
	userNameValidator,
	updateContact,
);
router.delete("/contact/:phoneNumber", checkToken, updateContact);

// messages
router.post(
	"/message",
	checkToken,
	receiverValidator,
	textValidator,
	createMessage,
);
router.get("/message", checkToken, getAllMessages);
router.get("/message/:id", checkToken, getOneMessage);
router.put("/message/:id", checkToken, textValidator, updateMessage);
router.delete("/message/:id", checkToken, deleteMessage);

export default router;
