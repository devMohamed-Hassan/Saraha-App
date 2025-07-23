import userModel from "../../config/models/user.model.js";

export const signUp = async (req, res, next) => {
  const { name, email, password, role, gender, phone, age } = req.body;
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    return res.status(400).json({ err: "This email is already exist" });
  }
  const user = await userModel.create({
    name,
    email,
    password,
    role,
    gender,
    age,
    phone,
  });
  res.status(201).json({ msg: "Signup successful", user });
};
