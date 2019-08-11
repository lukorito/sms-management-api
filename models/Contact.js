import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
