const express = require('express');
const router = express.Router();

const gravater = require('gravatar');

//import the user model
const { User, validateUser } = require('../models/user');

// import bcrypt //hash password
const bcrypt = require('bcrypt');

//middleware
const isAdmin = require('../middleware/admin');
const auth = require('../middleware/auth');

router.get('/me', (req, res) => {
  res.send('pppp');
});

router.post('/', async (req, res) => {
  //validate input
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email } = req.body;

  //check if the email
  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send('Email already registered');

  const avater = gravater.url(email, {
    s: '200', //size
    r: 'pg', //rating
    d: 'mm' //default
  });

  //hash password
  const password = await bcrypt.hash(req.body.password, 10);

  //create new user
  const user = await new User({
    name,
    email,
    password,
    avater
  });

  //save to the database
  await user.save();
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send('registered');
});

module.exports = router;
