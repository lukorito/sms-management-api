import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	sender: {
		type: String,
		required: true,
	},
	receiver: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	read: {
		type: Boolean,
		default: false,
	},
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
