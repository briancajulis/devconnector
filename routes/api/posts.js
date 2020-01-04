const express = require('express');
const router = express.Router();

// @route   GET api/posts
// @desc    Test Route
// @access  Public (if you need a token, private else public)
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router