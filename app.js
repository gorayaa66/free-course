const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");
const Admin = require("./routes/admin");
// const Course = require("./routes/courses");
// const Form = require("./routes/form");
const User=require("./routes/users")
const Index=require("./routes/index")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cron = require('node-cron');
var nodemailer = require("nodemailer")
const Details = require("./models/details")
const Forms = require("./models/forms");
const schedule = require('node-schedule');
const { PDFDocument } = require('pdf-lib');



const port = process.env.PORT || 61500;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/",Index)
app.use("/admin", Admin);
// app.use("/course", Course);
// app.use("/form", Form);
app.use("/users",User)


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});





mongoose
  .connect("mongodb+srv://johnoconsulting:Newcastle9@cluster0.btsxm.mongodb.net/freeCourse?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(success => console.log("Successfully connected to database"))
  .catch(err => console.log("Error while connecting to database"));

app.listen(port, () => console.log(`App listening on port : ${port}`));
