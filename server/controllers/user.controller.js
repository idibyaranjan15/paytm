import zod from "zod";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants.js";

// Validation Schemas
const signupSchema = zod.object({
  email: zod.string().email(),
  firstname: zod.string().min(1, "First name is required"),
  lastname: zod.string().min(1, "Last name is required"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const updateValueSchema = zod.object({
  firstname: zod.string().min(1, "First name is required"),
  lastname: zod.string().min(1, "Last name is required"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

// Signup Function
export const signup = async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Format Error",
      errors: parsed.error.format(),
    });
  }

  const { email, firstname, lastname, password } = parsed.data;

  try {
    // Check if user already exists
    const isAlreadyUserExists = await User.findOne({ email });
    if (isAlreadyUserExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = await User.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User onboarded successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Signin Function
export const signin = async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Validation Format Error",
      errors: parsed.error.format(),
    });
  }

  const { email, password } = parsed.data;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User has not registered yet",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Email or password is incorrect",
      });
    }
    const token = jwt.sign({ email: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Successful signin
    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const bulk = async (req, res) => {
  try {
    const response = await User.find({});
    console.log(response);
    const responseJson = response.map((item) => ({
      id: item._id,
      email: item.email,
      firstname: item.firstname,
      lastname: item.lastname,
      createdAt: item.createdAt,
    }));
    return res.status(200).json(responseJson);
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};

export const update = async (req, res) => {
  const parsed = updateValueSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Validdation Format Error",
      error: parsed.error.message(),
    });
  }
  try {
    const { email, firstname, lastname, password } = req.body;
    const isAlreadyUserExists = await User.findOne({ email });
    if (firstname) isAlreadyUserExists.firstname = firstname;
    if (lastname) isAlreadyUserExists.lastname = lastname;
    if (password)
      isAlreadyUserExists.password = await bcrypt.hash(password, 10);
    await isAlreadyUserExists.save();
    return res.status(200).json({
      message: "Value updated",
    });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
