const express = require('express');
const {
    getAllUser,
    getUser,
    deleteUser,
    createUser,
    updateUser,
} = require('../controllers/userController');

const router = express.Router();
router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
