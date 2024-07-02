const monggose = require('mongoose');

const portofolioSchema = new monggose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter portofolio name'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter description of portofolio'],
    },
    image: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
});

const Portofolio = monggose.model('Portofolio', portofolioSchema);

module.exports = Portofolio;
