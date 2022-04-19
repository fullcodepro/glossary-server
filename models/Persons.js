const { model, Schema } = require('mongoose');

const NewPersonSchema = new Schema({
    names: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'Users',
        required: [true, 'Es necesario el id de usuario de la persona']
    }
});

module.exports = model('Persons', NewPersonSchema);