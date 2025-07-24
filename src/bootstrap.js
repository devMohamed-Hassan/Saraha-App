import dotenv from "dotenv";
dotenv.config();

import authRouter from "./modules/authModule/auth.controller.js";
import userRouter from "./modules/userModule/user.controller.js";
import messageRouter from "./modules/messageModule/message.controller.js";
import dbConnection from "./config/db/connection.js";

const bootstrap = async (app, express) => {
  const PORT = process.env.PORT || 5000;
  app.use(express.json());

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({
        errMsg: "Invalid JSON format",
        status: 400,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      });
    }
    next(err);
  });

  await dbConnection();

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      errMsg: err.message || "Something went wrong",
      status: err.statusCode || 500,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

export default bootstrap;
