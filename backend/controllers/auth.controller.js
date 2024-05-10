import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    // Check if required fields are provided
    if (!req.body.email || !req.body.name || !req.body.photo) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // User exists, generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // Remove password field for security
      const { password: pass, ...rest } = user._doc;
      // Send back user data with token
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // User doesn't exist, create new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Generate a unique username
      const username = generateUniqueUsername(req.body.name);
      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      // Generate JWT token for new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      // Remove password field for security
      const { password: pass, ...rest } = newUser._doc;
      // Send back user data with token
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      res.status(400).json({ error: error.message });
    } else if (error.name === 'MongoError' && error.code === 11000) {
      // Handle duplicate key error (e.g., unique email constraint)
      res.status(400).json({ error: 'Email address already exists.' });
    } else {
      // Handle other unexpected errors
      next(error);
    }
  }
};

// Helper function to generate a unique username
const generateUniqueUsername = (name) => {
  return name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4);
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
