const express = require('express');
const router = express.Router();

const carroController = require("./controllers/carroController");

router.get('/carros', carroController.buscarTodos);
router.get('/carro/:codigo', carroController.buscarCarro);
router.post('/carro', carroController.criarCarro);
router.put('/carro', carroController.editarCarro);
router.delete('/carro', carroController.excluirCarro);

module.exports = router;