const router = require("express").Router();

const userRouter = require("./users");
const { login, createUser } = require("../controllers/users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errorCodes");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signup", createUser);
router.post("/signin", login);
router.use((req, res)=> {
  res.status(NOT_FOUND).json({message: "Requested resource not found"});
});

module.exports = router;