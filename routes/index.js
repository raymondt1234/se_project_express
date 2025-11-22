const router = require("express").Router();

const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const clothingItemRouter = require("./clothingItems");
const { NotFoundError } = require("../errors/not-found-err");
const {
  validateUserInfoBody,
  validateUserLogin,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signup", validateUserInfoBody, createUser);
router.post("/signin", validateUserLogin, login);
router.use((req, res, next) => next(new NotFoundError("Requested resource not found")));

module.exports = router;
