const monggose = require('mongoose');

const productSchema = new monggose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'Please enter price of product'],
    },
    description: {
        type: String,
        required: [true, 'Please enter description of product'],
    },
    rating: {
        type: Number,
        default: 4.7,
    },
    diskon: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price;
            },
            message:
                'Diskon anda terlalu besar ({VALUE}), silahkan dikurangi diskon anda ',
        },
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

const Product = monggose.model('Product', productSchema);

module.exports = Product;
