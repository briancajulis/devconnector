const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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
  (req, res) => {
    const errors = validationResult(req);

    // if there ARE errors
    if (!errors.isEmpty()) {
      // bad request
      return res.status(400).json({ errors: errors.array() });
    }

    // See if user exists

    // Get users gravatar

    // Encrypt password

    // Return jsonwebtoken

    res.send('User route');
  }
);

module.exports = router;
