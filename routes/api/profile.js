const express = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    Test Route
// @access  Public (if you need a token, private else public)
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router