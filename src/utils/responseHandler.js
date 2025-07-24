export const handleSuccess = ({
  res,
  statusCode = 200,
  message = "Success",
  data = {},
}) => {
  return res.status(statusCode).json({
    msg: message,
    status: statusCode,
    data,
  });
};
