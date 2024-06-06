const Product = require('../models/productModes');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/asyncError');

// get product
exports.getTours = catchAsync(async (req, res) => {
    const product = await Product.find(req.query);

    res.status(200).json({
        status: 'Succesfully !!',
        time: req.requestTime,
        result: product.length,
        data: { product },
    });
});

// get product by id

exports.getDetailsTours = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    // handle error if data is deleted or not found
    if (!product) {
        return next(new AppError('Data not found or has been deleted', 404));
    }

    res.status(200).json({
        status: 'Succesfully !!',
        data: { product },
    });
});

exports.createTours = catchAsync(async (req, res) => {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
        status: 'Success Created Data !!',
        data: {
            newProduct,
        },
    });
});

exports.updateTours = catchAsync(async (req, res, next) => {
    const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    // handle error if data is deleted or not found
    if (!updateProduct) {
        return next(new AppError('Data not found or has been deleted', 404));
    }
    res.status(200).json({
        status: 'Success updated Data !!',
        data: {
            updateProduct,
        },
    });
});

exports.deleteTours = catchAsync(async (req, res, next) => {
    const deleteProduct = await Product.findByIdAndDelete(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    // handle error if data is deleted or not found
    if (!deleteProduct) {
        return next(new AppError('Data not found or has been deleted', 404));
    }

    res.status(200).json({
        status: 'Success Deleted Data !!',
        data: {
            deleteProduct,
        },
    });
});
