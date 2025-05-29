const bcrypt = require("bcryptjs");
const connection = require("../config/database");

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "❌ Todos os campos são obrigatórios!" });
    }

    try {
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        const query = `INSERT INTO gestores (nome, email, senha) VALUES (?, ?, ?)`;

        connection.query(query, [nome, email, senhaHash], (err, result) => {
            if (err) {
                console.error("❌ Erro ao cadastrar gestor:", err);
                return res.status(500).json({ error: "Erro ao cadastrar gestor." });
            }
            res.json({ message: "✅ Cadastro realizado com sucesso!" });
        });
    } catch (error) {
        console.error("❌ Erro ao gerar hash da senha:", error);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};


const login = (req, res) => {
    const { email, senha } = req.body;

    const query = `SELECT * FROM gestores WHERE email = ?`;
    connection.query(query, [email], (err, result) => {
        if (err) {
            console.error("❌ Erro ao buscar gestor:", err);
            return res.status(500).json({ error: "Erro ao buscar gestor" });
        }
        
        if (result.length === 0) {
            return res.status(401).json({ error: "❌ Gestor não encontrado!" });
        }

        // Verificando se a senha enviada pelo usuário é igual à do banco
        if (senha !== result[0].senha) {
            return res.status(401).json({ error: "❌ Senha incorreta!" });
        }

        res.json({ message: "✅ Login realizado com sucesso!" });
    });
};

module.exports = {
    cadastrar,
    login
};