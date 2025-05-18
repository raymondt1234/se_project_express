const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db")
.then(() => {
  console.log("Connected to Database");
})
.catch(console.error);

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "682a5734755a6a5344c9938f"  // Replace with your actual test user ID
  };
  next();
});
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
