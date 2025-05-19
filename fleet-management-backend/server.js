const express = require("express");
const connection = require("./config/database"); // Certifique-se de que esse caminho está correto
const carroController = require("./controllers/carroController");
const motoristaController = require("./controllers/motoristaController");
const eventoController = require("./controllers/eventoController"); // Certifique-se de que esse arquivo está correto!

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

console.log("eventoController:", eventoController);

// Rotas para Carros
app.post("/api/carros", carroController.create);
app.get("/api/carros", carroController.list);
app.get("/api/carros/:id", carroController.get);

// Rotas para Motoristas
app.post("/api/motoristas", motoristaController.create);
app.get("/api/motoristas", motoristaController.list);
app.get("/api/motoristas/:id", motoristaController.get);

// Rotas para Eventos
app.get("/api/eventos", eventoController.listarEventos); // 🚀 Adicionada a rota para listar eventos
app.post("/api/eventos", eventoController.solicitarVeiculo);
app.post("/api/eventos/devolucao", eventoController.devolverVeiculo);
app.get("/api/eventos/disponibilidade", eventoController.verificarDisponibilidade);
app.get("/api/eventos/uso", eventoController.relatorioUsoVeiculos);
app.get("/api/eventos/motorista", eventoController.relatorioMotorista);

app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000!"));