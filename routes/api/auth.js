const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test Route
// @access  Public (if you need a token, private else public)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public (if you need a token, private else public)
router.post(
  '/',
  [
    // Make a check for each field
    check('email', 'Please include email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // if there ARE errors
    if (!errors.isEmpty()) {
      // bad request
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure data from req.body
    const { email, password } = req.body;

    try {
      // See if user exists (mongoose query)
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

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
