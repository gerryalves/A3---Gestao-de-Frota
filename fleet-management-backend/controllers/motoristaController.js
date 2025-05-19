const connection = require('../config/database');

// Criar um novo motorista (POST)
exports.create = (req, res) => {
    const { nome, telefone } = req.body;
    const query = `INSERT INTO motoristas (nome, telefone) VALUES ('${nome}', '${telefone}')`;

    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar motorista');
            throw err;
        }
        res.send('Motorista cadastrado com sucesso!');
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
