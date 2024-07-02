const express = require('express');
const productController = require('../controllers/productController');
const protectedRoute = require('../controllers/partials/protectedController');
const router = express.Router();

// router.param('id', productController.chekcId);
router
    .route('/')
    .get(productController.getTours)
    .post(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        productController.createTours
    );
router
    .route('/:id')
    .patch(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        productController.updateTours
    )
    .get(productController.getDetailsTours)
    .delete(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        productController.deleteTours
    );

module.exports = router;
