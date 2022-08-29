const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware');
const sellerController = require('../../controller/sellerController');

router.post('/create-catalog', auth, sellerController.createCatalog);
router.get('/orders', auth, sellerController.getOrder);

module.exports = router;