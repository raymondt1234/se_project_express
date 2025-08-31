const ClothingItem = require("../models/clothingItem");
const ForbiddenError = require("../errors/forbidden-err")


const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((ClothingItems) => {
      res.json(ClothingItems);
    })
    .catch(next);
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => {
      res.status(201).json(clothingItem);
    })
    .catch(next);
};

const deleteClothingItem = (req, res, next) => {
  const { clothingItemId } = req.params;
  ClothingItem.findById(clothingItemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) === req.user._id) {
        return ClothingItem.findByIdAndDelete(clothingItemId)
          .orFail()
          .then(() => {
            res.json({ message: "The item was successfully deleted." });
          })
          .catch(next);
      }

      return next(new ForbiddenError("Access denied"));

    }).catch(next);
};

const likeClothingItem = (req, res, next) => {
  const { clothingItemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    clothingItemId,
    { $addToSet: { likes: req.user._id } }, // adds user ID to likes array
    { new: true } // returns updated document
  )
    .orFail()
    .then((item) => {
      res.json(item);
    })
    .catch(next);
};

const dislikeClothingItem = (req, res, next) => {
  const { clothingItemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    clothingItemId,
    { $pull: { likes: req.user._id } }, // removes user ID from likes array
    { new: true } // returns updated document
  )
    .orFail()
    .then((item) => {
      res.json(item);
    })
    .catch(next);
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
