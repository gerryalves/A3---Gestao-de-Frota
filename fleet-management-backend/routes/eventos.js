const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

router.post('/solicitar', eventoController.solicitarVeiculo);
router.post('/devolver', eventoController.devolverVeiculo);
router.get('/disponibilidade', eventoController.verificarDisponibilidade);
router.get('/relatorios/uso', eventoController.relatorioUsoVeiculos);
router.get('/relatorios/motorista', eventoController.relatorioMotorista);

module.exports = router;
