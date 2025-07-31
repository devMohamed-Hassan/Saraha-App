import jwt from "jsonwebtoken";
import { findById } from "../services/db.service.js";
import userModel from "../config/models/user.model.js";

export const types = {
  access: "access",
  refresh: "refresh",
};
Object.freeze(types);

export const decodeToken = async (tokenType = types.access, token) => {
  let secret = "";

  if (tokenType === types.access) {
    secret = process.env.ACCESS_TOKEN_SECRET;
  } else if (tokenType === types.refresh) {
    secret = process.env.REFRESH_TOKEN_SECRET;
  } else {
    throw new Error("Invalid token type", { cause: 400 });
  }

  const payload = jwt.verify(token, secret);

  const user = await findById(userModel, payload._id);
  if (!user) {
    throw new Error("User Not Found", { cause: 404 });
  }

  return payload;
};

export const auth = () => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers;
      if (!token) {
        throw new Error("Token is required", { cause: 401 });
      }

      const payload = await decodeToken(types.access, token);
      const user = await findById(userModel, payload._id);
      if (!user) {
        throw new Error("User not found", { cause: 404 });
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
