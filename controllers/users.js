const User = require("../models/user");
const { errorHandler } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(errorHandler(res));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(errorHandler(res));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(errorHandler(res));
};

module.exports = { getUsers, createUser, getUser };
