const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'ruta protegida pedidos',
            pedido: req.pedido
        }
    })
})

module.exports = router