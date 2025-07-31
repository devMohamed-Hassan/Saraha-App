import jwt from "jsonwebtoken";
import userModel from "../../config/models/user.model.js";
import { findById } from "../../services/db.service.js";
import { handleSuccess } from "../../utils/responseHandler.js";

export const getUserProfile = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    throw new Error("Token is required", { cause: 401 });
  }

  const payload = jwt.verify(token, process.env.JWT_SIGNATURE);
  const user = await findById(userModel, payload._id);

  handleSuccess({
    res,
    statusCode: 200,
    message: "success",
    data: user,
  });
};
