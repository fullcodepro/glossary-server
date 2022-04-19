const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    active: { type: Boolean, default: true },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    displayName: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    username: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Users', UserSchema);
