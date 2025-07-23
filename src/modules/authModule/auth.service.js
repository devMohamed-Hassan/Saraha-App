import bcrypt from "bcrypt";
import userModel from "../../config/models/user.model.js";

const INVALID_CREDENTIALS_MSG = "Invalid email or password";
const SALT_ROUNDS = 10;

export const signUp = async (req, res, next) => {
  try {
    let { name, email, password, role, gender, phone, age } = req.body;

    if (!name || !email || !password || !phone || !age || !gender) {
      return res.status(400).json({ err: "All fields are required" });
    }

    email = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ err: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ err: "Password must be at least 6 characters" });
    }

    if (name.length < 2) {
      return res
        .status(400)
        .json({ err: "Name must be at least 2 characters" });
    }

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({ err: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      gender,
      age,
      phone,
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ msg: "Signup successful", user: userObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: "Email and password are required" });
    }

    email = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ err: "Invalid email format" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      const fakeHash = "$2b$10$abcdefghijklmnopqrstuvCDEFGHIJKLMNO123456";
      await bcrypt.compare(password, fakeHash);
      return res.status(400).json({ err: INVALID_CREDENTIALS_MSG });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: INVALID_CREDENTIALS_MSG });
    }

    const userObj = user.toObject();
    delete userObj.password;

    res.status(202).json({ msg: "Login successful", user: userObj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};
