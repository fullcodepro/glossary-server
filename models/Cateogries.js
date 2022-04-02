const { model, Schema } = require('mongoose');

const NewCategorySchema = Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Categories', NewCategorySchema);