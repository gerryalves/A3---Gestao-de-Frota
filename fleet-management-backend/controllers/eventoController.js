const connection = require("../config/database");

// Listar todos os eventos (GET)
const listarEventos = (req, res) => {
    const query = `SELECT * FROM eventos`;

    connection.query(query, (err, result) => {
        if (err) {
            console.error("❌ Erro ao listar eventos:", err);
            return res.status(500).send("Erro ao listar eventos");
        }
        res.json(result);
    });
};

// Solicitar um veículo (POST)
const solicitarVeiculo = (req, res) => {
    const { gestorId, motoristaId, telefoneMotorista, carroPlaca, odometroAtual } = req.body;

    if (!gestorId || !motoristaId || !telefoneMotorista || !carroPlaca || !odometroAtual) {
        return res.status(400).json({ error: "❌ Todos os campos são obrigatórios!" });
    }

    const queryBuscarCarro = "SELECT id FROM carros WHERE placa = ?";
    
    connection.query(queryBuscarCarro, [carroPlaca], (err, resultado) => {
        if (err || resultado.length === 0) {
            return res.status(500).json({ error: "❌ Erro ao encontrar veículo pela placa!" });
        }

        const carroId = resultado[0].id;

        const queryInserirEvento = "INSERT INTO eventos (gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual, tipoEvento) VALUES (?, ?, ?, ?, ?, 'Solicitação')";
        
        connection.query(queryInserirEvento, [gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual], (errInsercao, resultadoEvento) => {
            if (errInsercao) {
                return res.status(500).json({ error: "❌ Erro ao registrar evento!" });
            }
            res.json({ message: "✅ Veículo solicitado com sucesso!", idEvento: resultadoEvento.insertId });
        });
    });
};

// Devolver um veículo (POST)
const devolverVeiculo = (req, res) => {
    const { gestorIdDev, motoristaIdDev, telefoneMotoristaDev, carroPlacaDev, odometroAtualDev } = req.body;

    if (!gestorIdDev || !motoristaIdDev || !telefoneMotoristaDev || !carroPlacaDev || !odometroAtualDev) {
        return res.status(400).json({ error: "❌ Todos os campos são obrigatórios!" });
    }

    //  Buscar o ID do carro baseado na PLACA
    const queryBuscarCarro = "SELECT id FROM carros WHERE placa = ?";
    
    connection.query(queryBuscarCarro, [carroPlacaDev], (err, resultado) => {
        if (err || resultado.length === 0) {
            return res.status(500).json({ error: "❌ Erro ao encontrar veículo pela placa!" });
        }

        const carroId = resultado[0].id;

        //  Registrar evento de devolução
        const queryInserirEvento = "INSERT INTO eventos (gestorId, motoristaId, telefoneMotorista, carroId, odometroAtual, tipoEvento) VALUES (?, ?, ?, ?, ?, 'Devolução')";
        
        connection.query(queryInserirEvento, [gestorIdDev, motoristaIdDev, telefoneMotoristaDev, carroId, odometroAtualDev], (errInsercao, resultadoEvento) => {
            if (errInsercao) {
                return res.status(500).json({ error: "❌ Erro ao registrar evento de devolução!" });
            }
            res.json({ message: "✅ Veículo devolvido com sucesso!", idEvento: resultadoEvento.insertId });
        });
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
            console.error("❌ Erro ao verificar disponibilidade:", err);
            return res.status(500).send("Erro ao verificar disponibilidade");
        }
        res.json(result);
    });
};

// Relatório de uso dos veículos (GET)
const relatorioUsoVeiculos = (req, res) => {
    const { dataInicio, dataFim } = req.query;

    if (!dataInicio || !dataFim) {
        return res.status(400).json({ error: "❌ Informe a data de início e fim do período!" });
    }

    const query = `SELECT * FROM eventos WHERE tipoEvento IN ('saida', 'entrada', 'Solicitação', 'Devolução') AND data BETWEEN ? AND ?`;

    connection.query(query, [dataInicio, dataFim], (err, result) => {
        if (err) {
            console.error("❌ Erro ao gerar relatório de uso dos veículos:", err);
            return res.status(500).json({ error: "Erro ao gerar relatório de veículos" });
        }
        res.json(result);
    });
};

// Relatório de uso de um motorista (GET)
const relatorioMotorista = (req, res) => {
    const { motoristaId, dataInicio, dataFim } = req.query;

    if (!motoristaId || !dataInicio || !dataFim) {
        return res.status(400).json({ error: "❌ Informe o ID do motorista e o período!" });
    }

    const query = `SELECT * FROM eventos WHERE motoristaId = ? AND data BETWEEN ? AND ?`;

    connection.query(query, [motoristaId, dataInicio, dataFim], (err, result) => {
        if (err) {
            console.error("❌ Erro ao gerar relatório do motorista:", err);
            return res.status(500).json({ error: "Erro ao gerar relatório do motorista" });
        }
        res.json(result);
    });
};

module.exports = {
    listarEventos,
    solicitarVeiculo,
    devolverVeiculo,
    verificarDisponibilidade,
    relatorioUsoVeiculos,
    relatorioMotorista
};