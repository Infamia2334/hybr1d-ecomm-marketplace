const router = require('express').Router();

router.use('/auth', require('./authRoute'));
router.use('/buyer', require('./buyerRoute'));

module.exports = router;