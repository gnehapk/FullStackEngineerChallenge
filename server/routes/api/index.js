const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/employees', require('./employees'));
router.use('/reviews', require('./reviews'));
module.exports = router;
