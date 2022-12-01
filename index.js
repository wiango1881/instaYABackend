const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// capturar el body
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

// Conexión a base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.osnlren.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
     useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('Conectado a la base de datos'))
.catch(e => console.log('error de conexión', e))

// importar rutas
const authRoutes = require('./routes/auth');
const validaToken = require('./routes/validate-token');
const admin = require('./routes/admin');
const pedido = require('./routes/pedido');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/admin', validaToken, admin);
app.use('/api/pedido', validaToken, pedido);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`servidor ok ${PORT}`)
})