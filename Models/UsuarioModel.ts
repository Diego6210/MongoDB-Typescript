import mongoose, { Schema, model } from 'mongoose';

export interface Usuario extends mongoose.Document{
    nombre: string,
    email: string,
    password: string,
    img: string,
    role: string,
    estado: boolean
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'Usuario'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

export default model<Usuario>('Usuario', usuarioSchema );
