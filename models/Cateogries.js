const { model, Schema } = require('mongoose');

const NewCategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        default:''
    }
}, {
    timestamps: true,
    versionKey: false
});



module.exports = model('Categories', NewCategorySchema);