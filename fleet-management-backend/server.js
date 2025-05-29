const express = require("express");
const cors = require("cors");

const connection = require("./config/database");
const carroController = require("./controllers/carroController");
const motoristaController = require("./controllers/motoristaController");
const eventoController = require("./controllers/eventoController");
const gestorController = require("./controllers/gestorController");

const app = express();
app.use(express.json());
app.use(cors());

console.log("eventoController carregado:", eventoController);

// Autenticação do Gestor
app.post("/api/gestor/login", gestorController.login);
app.post("/api/gestor/cadastro", gestorController.cadastrar);

// CRUD de Motoristas
app.post("/api/motoristas", motoristaController.create);
app.get("/api/motoristas", motoristaController.list);
app.get("/api/motoristas/:id", motoristaController.get);
app.put("/api/motoristas/:id", motoristaController.update);
app.delete("/api/motoristas/:id", motoristaController.delete);

// CRUD de Carros
app.post("/api/carros", carroController.create);
app.get("/api/carros", carroController.list);
app.get("/api/carros/:id", carroController.get);
app.put("/api/carros/:id", carroController.update);
app.delete("/api/carros/:id", carroController.delete);

// CRUD de Eventos 
app.get("/api/eventos/listar", eventoController.listarEventos); 

// Rotas para Solicitação e Devolução de Veículos
app.post("/api/eventos/solicitar", eventoController.solicitarVeiculo);
app.post("/api/eventos/devolver", eventoController.devolverVeiculo);
app.get("/api/eventos/disponibilidade", eventoController.verificarDisponibilidade);

// Rotas de Relatórios 
app.get("/api/eventos/uso", eventoController.relatorioUsoVeiculos);
app.get("/api/eventos/motorista", eventoController.relatorioMotorista);

// Inicialização do servidor
app.listen(3000, () => console.log("✅ Servidor rodando na porta 3000! 🚀"));