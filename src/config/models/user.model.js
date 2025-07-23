import { Schema, model } from "mongoose";

export const Roles = {
  admin: "admin",
  user: "user",
};
Object.freeze(Roles);

export const Gender = {
  male: "male",
  female: "female",
};
Object.freeze(Gender);

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.user,
    },
    gender: {
      type: String,
      default: Gender.male,
      enum: Object.values(Gender),
    },
    phone: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const userModel = model("users", schema);
export default userModel;
