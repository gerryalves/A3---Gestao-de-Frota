const express = require("express");
const router = express.Router(); // Correto para definir rotas no controlador
const connection = require("../config/database"); // Certifique-se de que este caminho está correto

// Listar todos os eventos (GET)
const listarEventos = (req, res) => {
    const query = `SELECT * FROM eventos`;

    connection.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao listar eventos:", err);
            return res.status(500).send('Erro ao listar eventos');
        }
        res.json(result);
    });
};

// Solicitar um veículo (POST)
const solicitarVeiculo = (req, res) => {
    const { gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual } = req.body;
    const query = `INSERT INTO eventos (gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual, tipoEvento, data) VALUES (?, ?, ?, ?, ?, 'saida', NOW())`;

    connection.query(query, [gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual], (err, result) => {
        if (err) {
            console.error("Erro ao registrar solicitação:", err);
            return res.status(500).json({ error: "Erro ao registrar solicitação" });
        }
        console.log("✅ Evento salvo com sucesso no banco!", result);
        res.json({ message: "Veículo solicitado com sucesso!", id: result.insertId });
    });
};

// Devolver um veículo (POST)
const devolverVeiculo = (req, res) => {
    const { gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual } = req.body;
    const query = `INSERT INTO eventos (gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual, tipoEvento, data)
                   VALUES (?, ?, ?, ?, ?, 'entrada', NOW())`;

    connection.query(query, [gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual], (err, result) => {
        if (err) {
            console.error("Erro ao registrar devolução:", err);
            return res.status(500).send('Erro ao registrar devolução');
        }
        res.send({ message: "Veículo devolvido com sucesso!", id: result.insertId });
    });
};

// Verificar disponibilidade dos veículos (GET)
const verificarDisponibilidade = (req, res) => {
    const query = `SELECT * FROM carros WHERE id NOT IN (
        SELECT carroId FROM eventos WHERE tipoEvento = 'saida' 
        AND carroId NOT IN (SELECT carroId FROM eventos WHERE tipoEvento = 'entrada')
    )`;

    connection.query(query, (err, result) => {
        if (err) {
            console.error("Erro ao verificar disponibilidade:", err);
            return res.status(500).send('Erro ao verificar disponibilidade');
        }
        res.json(result);
    });
};

// Relatório de uso dos veículos (GET)
const relatorioUsoVeiculos = (req, res) => {
    const { dataInicio, dataFim } = req.query;
    const query = `SELECT * FROM eventos WHERE tipoEvento = 'saida' AND dataEvento BETWEEN ? AND ?`;

    connection.query(query, [dataInicio, dataFim], (err, result) => {
        if (err) {
            console.error("Erro ao gerar relatório de uso dos veículos:", err);
            return res.status(500).send('Erro ao gerar relatório');
        }
        res.json(result);
    });
};

// Relatório de uso de um motorista (GET)
const relatorioMotorista = (req, res) => {
    const { motoristaId, dataInicio, dataFim } = req.query;
    const query = `SELECT * FROM eventos WHERE motoristaId = ? AND dataEvento BETWEEN ? AND ?`;

    connection.query(query, [motoristaId, dataInicio, dataFim], (err, result) => {
        if (err) {
            console.error("Erro ao gerar relatório do motorista:", err);
            return res.status(500).send('Erro ao gerar relatório do motorista');
        }
        res.json(result);
    });
};
router.post("/api/eventos", (req, res) => {
    const { gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual } = req.body;

    console.log("🔍 Dados recebidos do frontend:", req.body); // Teste para verificar os dados

    const query = `INSERT INTO eventos (gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual, tipoEvento, data) 
                   VALUES (?, ?, ?, ?, ?, 'saida', NOW())`;

    connection.query(query, [gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual], (err, result) => {
        if (err) {
            console.error("❌ Erro ao registrar solicitação:", err);
            return res.status(500).json({ error: "Erro ao registrar solicitação" });
        }
        console.log("✅ Evento salvo no banco!", result);
        res.json({ message: "Veículo solicitado com sucesso!", id: result.insertId });
    });
});


// Exportando funções corretamente
module.exports = {
    listarEventos, // Agora a rota GET /api/eventos funcionará corretamente!
    solicitarVeiculo,
    devolverVeiculo,
    verificarDisponibilidade,
    relatorioUsoVeiculos,
    relatorioMotorista
};