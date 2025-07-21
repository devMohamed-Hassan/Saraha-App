import dotenv from "dotenv";
dotenv.config();

import authRouter from "./modules/authModule/auth.controller.js";
import userRouter from "./modules/userModule/user.controller.js";
import messageRouter from "./modules/messageModule/message.controller.js";
import dbConnection from "./config/db/connection.js";

const bootstrap = async (app, express) => {
  const PORT = process.env.PORT ;
  app.use(express.json());

  await dbConnection();

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

export default bootstrap;
