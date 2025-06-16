const router = require("express").Router();

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");

router.get("/", getClothingItems);
router.post("/", auth, createClothingItem);
router.delete("/:clothingItemId", auth, deleteClothingItem);
router.put("/:clothingItemId/likes", auth, likeClothingItem);
router.delete("/:clothingItemId/likes", auth, dislikeClothingItem);

module.exports = router;
