const router = require("express").Router();
const { validateUserUpdate } = require("../middlewares/validation");

const { getCurrentUser, updateUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUserUpdate, updateUser);

module.exports = router;
