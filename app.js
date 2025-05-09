const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db")
.then(() => {
  console.log("Connected to Database");
})
.catch(console.error);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
