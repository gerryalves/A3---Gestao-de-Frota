const connection = require('../config/database');

// Criar um novo carro (POST)
exports.create = (req, res) => {
    const { modelo, placa } = req.body;

    if (!modelo || !placa) {
        return res.status(400).json({ error: "❌ Todos os campos são obrigatórios!" });
    }

    const query = "INSERT INTO carros (modelo, placa, disponivel) VALUES (?, ?, 1)";
    
    connection.query(query, [modelo, placa], (err, result) => {
        if (err) {
            console.error("❌ Erro ao adicionar carro:", err);
            return res.status(500).json({ error: "Erro ao adicionar carro" });
        }
        res.json({ message: "✅ Carro adicionado com sucesso!", id: result.insertId });
    });
};


// Listar todos os carros (GET)
exports.list = (req, res) => {
    const query = 'SELECT * FROM carros';

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao listar carros');
            throw err;
        }
        res.json(results);
    });
};

// Obter um carro específico pelo ID (GET)
exports.get = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM carros WHERE id = ${id}`;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter carro');
            throw err;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Carro não encontrado');
        }
    });
};

// Atualizar um carro pelo ID (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { modelo, placa, odometro } = req.body;
    const query = `UPDATE carros SET modelo = '${modelo}', placa = '${placa}' WHERE id = ${id}`;

    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao atualizar carro');
            throw err;
        }
        if (result.affectedRows > 0) {
            res.send('Carro atualizado com sucesso!');
        } else {
            res.status(404).send('Carro não encontrado');
        }
    });
};

// Deletar um carro pelo ID (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM carros WHERE id = ${id}`;

    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao deletar carro');
            throw err;
        }
        if (result.affectedRows > 0) {
            res.send('Carro deletado com sucesso!');
        } else {
            res.status(404).send('Carro não encontrado');
        }
    });
};
