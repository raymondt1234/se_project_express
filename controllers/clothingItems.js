const ClothingItem = require("../models/clothingItem");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((ClothingItems) => {
      res.status(200).json(ClothingItems);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: err.message });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((clothingItem) => {
      res.status(201).json(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    });
};

const deleteClothingItem = (req, res) => {
  const { clothingItemId } = req.params;
  ClothingItem.findByIdAndDelete(clothingItemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.name = "DocumentNotFoundError";
      error.statusCode = 404;
      throw error;
    })
    .then(() => {
      res.status(200).json({});
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    });
};

const likeClothingItem = (req, res) => {
  const { clothingItemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    clothingItemId,
    { $addToSet: { likes: req.user._id } }, // adds user ID to likes array
    { new: true } // returns updated document
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.name = "DocumentNotFoundError";
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    });
};

const dislikeClothingItem = (req, res) => {
  const { clothingItemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    clothingItemId,
    { $pull: { likes: req.user._id } }, // removes user ID from likes array
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.name = "DocumentNotFoundError";
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log("Error name:", err.name);
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
