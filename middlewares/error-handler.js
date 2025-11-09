const errorHandler = (err, req, res, _next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({message: err.message || "An error has occurred on the server"});
};

module.exports = { errorHandler };
