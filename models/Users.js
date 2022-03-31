const { model, Schema } = require('mongoose');

const UsuarioSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Users', UsuarioSchema);
