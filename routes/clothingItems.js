const router = require("express").Router();
const { validateCardBody, validateId } = require("../middlewares/validation");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");

router.get("/", getClothingItems);
router.post("/", auth, validateCardBody, createClothingItem);
router.delete("/:clothingItemId", auth, validateId, deleteClothingItem);
router.put("/:clothingItemId/likes", auth, validateId, likeClothingItem);
router.delete("/:clothingItemId/likes", auth, validateId, dislikeClothingItem);

module.exports = router;
