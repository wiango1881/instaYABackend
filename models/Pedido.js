const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: true,
        min: 8,
        max: 12
    },
    hora: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    largo: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    ancho: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    alto: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    peso: {
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    direccionRecogida: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    ciudadRecogida: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    nombreDestinatario: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    docuemntoDestinatario: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    direccionEntrega: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    ciudadEntrega: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    idUsuario: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Pedido', pedidoSchema);