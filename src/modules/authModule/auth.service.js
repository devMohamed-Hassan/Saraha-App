import bcrypt from "bcrypt";
import userModel from "../../config/models/user.model.js";

const INVALID_CREDENTIALS_MSG = "Invalid email or password";
const SALT_ROUNDS = 10;

export const signUp = async (req, res, next) => {
  let { name, email, password, role, gender, phone, age } = req.body;

  if (!name || !email || !password || !phone || !age || !gender) {
    throw new Error("All fields are required", { cause: 400 });
  }

  email = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format", { cause: 400 });
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters", { cause: 400 });
  }

  if (name.length < 2) {
    throw new Error("Name must be at least 2 characters", { cause: 400 });
  }

  const isExist = await userModel.findOne({ email });
  if (isExist) {
    throw new Error("This email is already registered", { cause: 400 });
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
};

export const login = async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Email and password are required", { cause: 400 });
  }

  email = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format", { cause: 400 });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    const fakeHash = "$2b$10$abcdefghijklmnopqrstuvCDEFGHIJKLMNO123456";
    await bcrypt.compare(password, fakeHash);
    throw new Error(INVALID_CREDENTIALS_MSG, { cause: 400 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(INVALID_CREDENTIALS_MSG, { cause: 400 });
  }

  const userObj = user.toObject();
  delete userObj.password;

  res.status(202).json({ msg: "Login successful", user: userObj });
};
