const { model, Schema } = require('mongoose');

const NewProduct = Schema({
    name: {
        type: String,
        required: true,
        required: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
    }],
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Products', NewProduct);