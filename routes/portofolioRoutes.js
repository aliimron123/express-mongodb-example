const express = require('express');
const portofolioController = require('../controllers/portofolioController');
const protectedRoute = require('../controllers/partials/protectedController');
const router = express.Router();

// router.param('id', portofolioController.chekcId);
router
    .route('/')
    .get(portofolioController.getPortofolio)
    .post(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        portofolioController.createPortofolio
    );
router
    .route('/:id')
    .patch(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        portofolioController.updatePortofolio
    )
    .get(portofolioController.getDetailsPortofolio)
    .delete(
        protectedRoute.protected,
        protectedRoute.protectRoleby('authorityAdmin'),
        portofolioController.deletePortofolio
    );

module.exports = router;
