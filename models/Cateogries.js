const { model, Schema } = require('mongoose');

const NewCategory = Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Categories', NewCategory);