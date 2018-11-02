const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.user_signup = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });

      user.save()
        .then(result => {
          console.log(result);
          res.status(200).json({
            success: 'New user has been created'
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
}

exports.user_signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            failed: 'Unauthorized Access'
          });
        }
        if (result) {
          const JWTToken = jwt.sign({
            email: user.email,
            _id: user._id
          },
          'secret',
          {
            expiresIn: '1h'
          });
          return res.status(200).json({
            success: 'Auth successful',
            token: JWTToken
          });
        }
        return res.status(401).json({
          failed: 'Unauthorized Access'
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}