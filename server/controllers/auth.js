// Allows us to encrypt our password
import bcrypt from "bcrypt";
// gives us a way to send a user a web token that they can use for authorization
import jwt from "jsonwebtoken";

import User from "../models/User.js";

/* REGISTER USER */

// here async is like a api call from front end to backend then from backend to database, req will provide the request body we get from front end and response is what we are sending back to the front end.
export const register = async (req, res) => {
  try{
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation
    } = req.body;

    // using random salt provided by bcrypt and use it to salt our password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({error: err.message});
  } 
};

/* LOGGING IN */

export const login = async (req, res) => {
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) return res.status(400).json({msg: "User does not exist." });

// use bcrypt to compare the user password and actual password using same salt to see if they match
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: "Invalid credentials." });

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({token, user});
  } catch(err) {
    res.status(500).json({error: err.message});
  }

}