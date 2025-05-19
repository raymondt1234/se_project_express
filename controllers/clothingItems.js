const ClothingItem = require("../models/clothingItem");
const { errorHandler } = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((ClothingItems) => {
      res.status(200).json(ClothingItems);
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
  ClothingItem.findByIdAndDelete(clothingItemId)
    .orFail()
    .then(() => {
      res.status(200).json({});
    })
    .catch(errorHandler(res, "json"));
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
      res.status(200).json(item);
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
      res.status(200).json(item);
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
