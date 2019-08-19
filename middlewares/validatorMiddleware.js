export const phoneNumberValidator = (req, res, next) => {
	if (req.body && "phoneNumber" in req.body) {
		if (!/^[0-9]+$/.test(req.body.phoneNumber)) {
			res.status(400).json({ message: "Invalid phone number" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "PhoneNumber is required" });
	}
};

export const receiverValidator = (req, res, next) => {
	if (req.body && "receiver" in req.body) {
		if (!/^[0-9]+$/.test(req.body.receiver)) {
			res.status(400).json({ message: "Invalid phone number" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "receiver is required" });
	}
};

export const textValidator = (req, res, next) => {
	if (req.body && "text" in req.body) {
		if (!/\S+/.test(req.body.text)) {
			res.status(400).json({ message: "Text is required" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "Text is required" });
	}
};

export const userNameValidator = (req, res, next) => {
	if (req.body && "username" in req.body) {
		if (!/\S+/.test(req.body.username)) {
			res.status(400).json({ message: "Username is required" });
		} else {
			next();
		}
	} else {
		res.status(400).json({ message: "Username is required" });
	}
};
