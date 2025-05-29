const connection = require('../config/database');

// Criar um novo motorista (POST)
exports.create = (req, res) => {
    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
        return res.status(400).json({ error: "❌ Todos os campos são obrigatórios!" });
    }

    const query = "INSERT INTO motoristas (nome, telefone) VALUES (?, ?)";
    
    connection.query(query, [nome, telefone], (err, result) => {
        if (err) {
            console.error("❌ Erro ao adicionar motorista:", err);
            return res.status(500).json({ error: "Erro ao adicionar motorista" }); // 🔥 Retorna erro em JSON!
        }
        res.json({ message: "✅ Motorista adicionado com sucesso!", id: result.insertId });
    });
};


// Listar todos os motoristas (GET)
exports.list = (req, res) => {
    const query = 'SELECT * FROM motoristas';

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao listar motoristas');
            throw err;
        }
        res.json(results);
    });
};

// Obter um motorista específico pelo ID (GET)
exports.get = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM motoristas WHERE id = ${id}`;

    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao obter motorista');
            throw err;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Motorista não encontrado');
        }
    });
};

// Atualizar um motorista pelo ID (PUT)
exports.update = (req, res) => {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    const query = `UPDATE motoristas SET nome = '${nome}', telefone = '${telefone}' WHERE id = ${id}`;

    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao atualizar motorista');
            throw err;
        }
        if (result.affectedRows > 0) {
            res.send('Motorista atualizado com sucesso!');
        } else {
            res.status(404).send('Motorista não encontrado');
        }
    });
};

// Deletar um motorista pelo ID (DELETE)
exports.delete = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM motoristas WHERE id = ${id}`;

    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao deletar motorista');
            throw err;
        }
        if (result.affectedRows > 0) {
            res.send('Motorista deletado com sucesso!');
        } else {
            res.status(404).send('Motorista não encontrado');
        }
    });
};
