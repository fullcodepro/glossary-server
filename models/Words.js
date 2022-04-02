const { model, Schema } = require('mongoose');

const NewWordSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    }],
}, {
    timestamps: true,
    versionKey: false
})

NewWordSchema.methods.toJSON = function(){
    const { _id, ...word } = this.toObject();
    word.id = _id;
    return word;
};

module.exports = model('Words', NewWordSchema);