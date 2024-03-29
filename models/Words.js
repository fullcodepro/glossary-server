const { model, Schema } = require('mongoose');

const NewWordSchema = Schema({
    categoryId: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    }],
    definition: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    wordName: {
        type: String,
        required: true,
    },
    createdFor: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    modifiedFor: {
        type: Schema.Types.ObjectId, ref: 'Users'
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Words', NewWordSchema);