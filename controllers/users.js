const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../errors/bad-request-err");

const removeUserPassword = (user) => {
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

const createUser = (req, res, next) => {
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
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => {
      res.json(removeUserPassword(user));
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (avatar !== undefined) updates.avatar = avatar;

  User.findOneAndUpdate({ _id }, updates, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.json(removeUserPassword(user));
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.json({ user: removeUserPassword(user), token });
      })
      .catch(next);
  }
  return next(new BadRequestError("Missing email or password"));
};

module.exports = { createUser, getCurrentUser, updateUser, login };
