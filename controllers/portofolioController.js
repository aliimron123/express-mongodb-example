const Product = require('../models/productModel');
const Portofolio = require('../models/portofolioModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/asyncError');

// get portofolio
exports.getPortofolio = catchAsync(async (req, res) => {
    const data = await Portofolio.find(req.query);

    res.status(200).json({
        status: 'Succesfully !!',
        time: req.requestTime,
        result: data.length,
        data,
    });
});

// get data by id

exports.getDetailsPortofolio = catchAsync(async (req, res, next) => {
    const data = await Portofolio.findById(req.params.id);

    // handle error if data is deleted or not found
    if (!data) {
        return next(new AppError('Data not found or has been deleted', 404));
    }

    res.status(200).json({
        status: 'Succesfully !!',
        data,
    });
});

exports.createPortofolio = catchAsync(async (req, res) => {
    const data = await Portofolio.create(req.body);

    res.status(201).json({
        status: 'Success Created Data !!',
        data,
    });
});

exports.updatePortofolio = catchAsync(async (req, res, next) => {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // handle error if data is deleted or not found
    if (!data) {
        return next(new AppError('Data not found or has been deleted', 404));
    }
    res.status(200).json({
        status: 'Success updated Data !!',
        data,
    });
});

exports.deletePortofolio = catchAsync(async (req, res, next) => {
    const data = await Product.findByIdAndDelete(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // handle error if data is deleted or not found
    if (!data) {
        return next(new AppError('Data not found or has been deleted', 404));
    }

    res.status(200).json({
        status: 'Success Deleted Data !!',
        data,
    });
});
