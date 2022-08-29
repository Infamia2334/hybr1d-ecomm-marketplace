const router = require('express').Router();

router.use('/auth', require('./authRoute'));

module.exports = router;