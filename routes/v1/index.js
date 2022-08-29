const router = require('express').Router();

router.use('/auth', require('./authRoute'));
router.use('/buyer', require('./buyerRoute'));
router.use('/seller', require('./sellerRoute'));

module.exports = router;