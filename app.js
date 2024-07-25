// external import
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal imports
const {
  errorHandler,
  notFoundHandler,
} = require('./middleware/common/errorhandler');

const app = express();
dotenv.config();
const port = process.env.PORT;

// connect mongosh

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Database connection successfull');
  })
  .catch(() => {
    console.log('Error connecting to Database');
  });

//   parse req data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// parse cookies

app.use(cookieParser(process.env.COOKIE_SECREET));

// set up routes

// not found page
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
