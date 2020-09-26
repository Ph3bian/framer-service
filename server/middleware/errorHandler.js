export default (error, req, res, next) =>
  res.status(500).json({
    status: 500,
    success: false,
    error: error.message,
  });