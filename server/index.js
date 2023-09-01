const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5001;

//mongose connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected Successfully");
  })
  .catch((error) => {
    console.log(error);
  });
//mongoDB connect end

//middle ware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//routes
app.use("/", require("./routes/authRoutes"));
app.use("/",require("./routes/taskRoutes.js"))

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
