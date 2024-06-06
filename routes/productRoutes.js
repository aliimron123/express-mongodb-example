const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// router.param('id', productController.chekcId);
router
    .route('/')
    .get(productController.getTours)
    .post(productController.createTours);
router
    .route('/:id')
    .patch(productController.updateTours)
    .get(productController.getDetailsTours)
    .delete(productController.deleteTours);

module.exports = router;
