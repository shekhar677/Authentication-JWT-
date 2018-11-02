const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

// routes
const user = require('./routes/user.route');

// connect to database
mongoose.connect('mongodb://localhost/jwtauth', { useNewUrlParser: true})
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(() => {
    console.log('failed to connect to database');
  });

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});