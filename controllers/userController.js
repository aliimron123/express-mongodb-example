const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/asyncError');

// get detail
exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!product) {
        return next(new AppError('Data not found or has been deleted', 404));
    }
    res.status(200).json({
        status: 'Success!!',
        message: 'Success Show User!!',
        data: { user },
    });
});
// create User
exports.createUser = catchAsync(async (req, res) => {
    const user = await User.create(req.body);
    res.status(500).json({
        status: 'error',
        data: { user },
        message: 'Oops Something Wrong !!',
    });
});
//

exports.getAllUser = catchAsync(async (req, res) => {
    const user = await User.find({ role: 'user' });
    res.status(200).json({
        status: 'Success',
        data: { user },
        message: 'Success show all user !!',
    });
});

exports.updateUser = catchAsync(async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // handle error if data is deleted or not found
    if (!updateUser) {
        return next(new AppError('Data not found or has been deleted', 404));
    }
    res.status(200).json({
        status: 'Success updated User !!',
        data: {
            updateUser,
        },
    });
});

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Oops Something Wrong !!',
    });
};
