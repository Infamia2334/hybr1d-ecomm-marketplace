const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware');

const buyerController = require('../../controller/buyerController');

router.get('/list-of-sellers', auth, buyerController.getAllSellers);
router.get('/seller-catalog/:sellerId', auth, buyerController.getCatalog);
router.post('/create-order/:sellerId', auth, buyerController.createOrder);

module.exports = router;