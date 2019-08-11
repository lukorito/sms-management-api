import User from '../models/User';
import bcrypt from 'bcrypt';

export function signup(req, res, next) {
    if(isNaN(req.body.phoneNumber)){
        res.status(400).json({ message: 'Phone Number must be a number'})
    }
    const passwordHash = bcrypt.hashSync(
        req.body.password,
        10
    );  

    let user = new User({
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        password: passwordHash
    })

    user.save(function(err) {
        if(err){
            res.status(500).json({message: 'An error has occured'})
        } else {
            res.status(201).json({message: 'User successfully created' })
        }
    })
}

export function  login(req, res, next) {
    
}
