import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function signup(req, res, next) {
	if (isNaN(req.body.phoneNumber)) {
		res.status(400).json({ message: "Phone Number must be a number" });
	}

	User.findOne({ phoneNumber: req.body.phoneNumber }, function(err, user) {
		if (user) {
			res.status(400).json({ message: "User already exists" });
		} else {
			const passwordHash = bcrypt.hashSync(req.body.password, 10);

			let user = new User({
				username: req.body.username,
				phoneNumber: req.body.phoneNumber,
				password: passwordHash,
			});

			user.save(function(err) {
				if (err) {
					res.status(500).json({ message: "An error has occured" });
				} else {
					res.status(201).json({
						message: "User successfully created",
					});
				}
			});
		}
	});
}

export async function login(req, res, next) {
	const user = await User.find({ phoneNumber: req.body.phoneNumber }).exec();

	if (user.length) {
		const match = await bcrypt.compare(req.body.password, user[0].password);
		if (match) {
			const token = jwt.sign(
				{
					username: user[0].username,
					phoneNumber: user[0].phoneNumber,
				},
				process.env.JWT_SECRET,
				{ expiresIn: "24h" },
			);
			res.status(200).json({ accessToken: token });
		} else {
			res.status(400).json({ message: "Invalid login" });
		}
	} else {
		res.status(400).json({ message: "Invalid login" });
	}
}
