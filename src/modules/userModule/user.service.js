import jwt from "jsonwebtoken";
import userModel from "../../config/models/user.model.js";
import { findById } from "../../services/db.service.js";
import { handleSuccess } from "../../utils/responseHandler.js";

export const getUserProfile = async (req, res, next) => {
  const user = req.user;
  handleSuccess({
    res,
    statusCode: 200,
    message: "success",
    data: user,
  });
};
