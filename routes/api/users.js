const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../models/Users');

// @route   POST api/users
// @desc    Register user
// @access  Public (if you need a token, private else public)
router.post(
  '/',
  [
    // Make a check for each field
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // if there ARE errors
    if (!errors.isEmpty()) {
      // bad request
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure data from req.body
    const { name, email, password } = req.body;

    try {
      // See if user exists (mongoose query)
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        // Size
        s: '200',
        // Rating
        r: 'pg',
        // Default (mm = default image)
        d: 'mm'
      });

      //   1. create user
      //   2. hash the password
      //   3. save the user to database
      //   4. get the payload which includes the user id
      //   6. sign the token and pass in the payload, pass in the secret, expiration, callback (error or return token)

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      // create a salt
      const salt = await bcrypt.genSalt(10); // 10 is recommended

      user.password = await bcrypt.hash(password, salt);

      await user.save(); // saves user to database

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      // takes in payload, secret key, additional opetions, callback function(for errors checks or return token)
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, // change to 3600s (1hr) for production
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
