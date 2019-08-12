import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
