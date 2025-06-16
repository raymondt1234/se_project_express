const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { errorHandler, requiredFieldError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const removeUserPassword = (user) => {
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users.map(removeUserPassword));
    })
    .catch(errorHandler(res));
};

const createUser = (req, res) => {
  const { name, password, email, avatar } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
        avatar,
      })
    )
    .then((user) => {
      res.status(201).json(removeUserPassword(user));
    })
    .catch(errorHandler(res));
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => {
      res.json(removeUserPassword(user));
    })
    .catch(errorHandler(res));
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  User.findOneAndUpdate({ _id }, { name, avatar }, { new: true })
    .orFail()
    .then((user) => {
      res.json(removeUserPassword(user));
    })
    .catch(errorHandler(res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.json({ user: removeUserPassword(user), token });
      })
      .catch(errorHandler(res));
  }

  const error = requiredFieldError();
  return res.status(error.statusCode).json({ message: error.message });
};

module.exports = { getUsers, createUser, getCurrentUser, updateUser, login };
