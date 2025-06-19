const ClothingItem = require("../models/clothingItem");
const { errorHandler, accessDeniedError } = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((ClothingItems) => {
      res.json(ClothingItems);
    })
    .catch(errorHandler(res));
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => {
      res.status(201).json(clothingItem);
    })
    .catch(errorHandler(res));
};

const deleteClothingItem = (req, res) => {
  const { clothingItemId } = req.params;
  ClothingItem.findById(clothingItemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) === req.user._id) {
        ClothingItem.findByIdAndDelete(clothingItemId)
          .orFail()
          .then(() => {
            res.json({ message: "The item was successfully deleted." });
          })
          .catch(errorHandler(res, "json"));
      } else {
        throw accessDeniedError();
      }
    }).catch(errorHandler(res));
};

const likeClothingItem = (req, res) => {
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
    .catch(errorHandler(res));
};

const dislikeClothingItem = (req, res) => {
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
    .catch(errorHandler(res));
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
