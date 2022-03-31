const { model, Schema } = require('mongoose');

const NewVisitSchema = Schema({
    name: {
        type: String,
        default: ''
    },
    visits: {
        type: Number,
        default: 0,
        min: 0,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model('Visits', NewVisitSchema )