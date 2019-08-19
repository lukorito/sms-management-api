import Contact from "../models/Contact";
import Message from "../models/Message";

export const createContact = async (req, res, next) => {
	const { phoneNumber, username } = req.body;
	if (phoneNumber === req.user.phoneNumber) {
		res.status(400).json({
			message: "You cannot create your own contact",
		});
	} else {
		let contact;
		contact = await Contact.find({
			phoneNumber,
			createdBy: req.user.phoneNumber,
		}).exec();
		if (!contact.length) {
			contact = new Contact({
				username,
				phoneNumber,
				createdBy: req.user.phoneNumber,
			});
			await contact.save(function(err) {
				if (err) {
					res.status(500).json({
						message: "An error has occured",
					});
				} else {
					res.status(201).json({
						message: "Contact created successfully",
					});
				}
			});
		} else {
			res.status(400).json({
				message: "Contact already exists",
			});
		}
	}
};

export const getOne = async (req, res, next) => {
	const contact = await Contact.findOne({
		phoneNumber: req.params.phoneNumber,
		createdBy: req.user.phoneNumber,
	}).exec();
	return contact
		? res.status(200).json({ contact })
		: res.status(400).json({ message: "No contact found" });
};

export const getAll = async (req, res, next) => {
	const contacts = await Contact.find({
		createdBy: req.user.phoneNumber,
	}).exec();
	return contacts.length
		? res.status(200).json({ contacts })
		: res.status(200).json({ message: "No contacts found" });
};

export const updateContact = async (req, res, next) => {
	const contact = await Contact.findOne({
		createdBy: req.user.phoneNumber,
		phoneNumber: req.params.phoneNumber,
	}).exec();

	if (contact) {
		contact.username = req.body.username;
		await contact.save();
		res.status(200).json({ message: "Contact updated successfully" });
	} else {
		res.status(400).json({ message: "No contact found" });
	}
};

export const deleteContact = async (req, res, next) => {
	const contact = await Contact.findOne({
		createdBy: req.user.phoneNumber,
		phoneNumber: req.params.phoneNumber,
	}).exec();
	if (contact) {
		await Message.deleteMany({ sender: req.params.phoneNumber, receiver: req.params.phoneNumber});
		await Contact.deleteOne({ phoneNumber: contact.phoneNumber });
		res.status(400).json({ message: "Contact deleted" });
	} else {
		res.status(400).json({ message: "No contact found" });
	}
};
