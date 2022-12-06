const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const Pedido = require('../models/Pedido');

const schemaRegister = Joi.object({
    nombre: Joi.string().min(3).max(255).required(),
    usuario: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(3).max(1024).email()
})

const schemaLogin = Joi.object({
    usuario: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(255).required()
})

const schemaPedido = Joi.object({
    fecha: Joi.string().min(8).max(12).required(),
    hora: Joi.string().min(3).max(10).required(),
    largo: Joi.string().min(1).max(10).required(),
    ancho: Joi.string().min(1).max(10).required(),
    alto: Joi.string().min(1).max(10).required(),
    peso: Joi.string().min(1).max(10).required(),
    direccionRecogida: Joi.string().min(1).max(255).required(),
    ciudadRecogida: Joi.string().min(1).max(255).required(),
    nombreDestinatario: Joi.string().min(1).max(255).required(),
    docuemntoDestinatario: Joi.string().min(1).max(255).required(),
    direccionEntrega: Joi.string().min(1).max(255).required(),
    ciudadEntrega: Joi.string().min(1).max(255).required()
})

router.post('/login', async(req, res) => {
    //validaciones de login
    const { error } = schemaLogin.validate(req.body); 

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }
    
    const usuario = await User.findOne({ usuario: req.body.usuario })
    if (!usuario) {
        return res.status(400).json({
            error: true, 
            mensaje: 'Usuario o contraseña no valida'
        })         
    }

    const passwordValida = await bcrypt.compare(req.body.password, usuario.password)
    if (!passwordValida) {
        return res.status(400).json({
            error: true, 
            mensaje: 'Usuario o contraseña no valida'
        })         
    }

    const token = jwt.sign({
        usuario: usuario.usuario,
        id: usuario.id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })

})

router.post('/register', async (req, res) => {

    //validaciones de usuario
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const emailExiste = await User.findOne({ email: req.body.email })
    if (emailExiste) {
        return res.status(400).json({
            error: true, 
            mensaje: 'Email ya registrado'
        })         
    }

    const usuarioExiste = await User.findOne({ usuario: req.body.usuario })
    if (usuarioExiste) {
        return res.status(400).json({
            error: true, 
            mensaje: 'El nombre de usuario ya existe'
        })         
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        password,
        email: req.body.email

    })

    try {
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/pedido', async (req, res) => {

    const pedido = new Pedido({
        fecha: req.body.fecha,
        hora: req.body.hora,
        largo: req.body.largo,
        ancho: req.body.ancho,
        alto: req.body.alto,
        peso: req.body.peso,
        direccionRecogida: req.body.direccionRecogida,
        ciudadRecogida: req.body.ciudadRecogida,
        nombreDestinatario: req.body.nombreDestinatario,
        docuemntoDestinatario: req.body.docuemntoDestinatario,
        direccionEntrega: req.body.direccionEntrega,
        ciudadEntrega: req.body.ciudadEntrega,
        idUsuario: req.body.idUsuario

    })

    try {
        const pedidoDB = await pedido.save();
        res.json({
            error: null,
            data: pedidoDB
        })
    } catch (error) {
        res.status(400).json(error)
    }
})
// otra forma
router.get('/pedidoAll', (req, res) => {    
    Pedido
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ messaje: error }))
})

router.get('/pedido/:id', (req, res) => {
    const { id } = req.params;    
    Pedido
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ messaje: error }))
})

router.put('/pedido/:id', (req, res) => {
    const { id } = req.params;
    const { fecha, hora, largo, ancho, alto, peso, direccionRecogida, ciudadRecogida, nombreDestinatario, docuemntoDestinatario, direccionEntrega, ciudadEntrega } = req.body;  
    Pedido
    .updateOne({ _id: id }, {$set: { fecha, hora, largo, ancho, alto, peso, direccionRecogida, ciudadRecogida, nombreDestinatario, docuemntoDestinatario, direccionEntrega, ciudadEntrega } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ messaje: error }))
}) 

router.delete('/pedido/:id', (req, res) => {
    const { id } = req.params;
    Pedido
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ messaje: error }))
})

/* router.get('/pedido', async (req, res) => {  
    try {
        const pedidoDB = await Pedido.find();
        res.json({
            error: null,
            data: pedidoDB
        })
    } catch (error) {
        res.status(400).json(error)
    }
}) */

module.exports = router;