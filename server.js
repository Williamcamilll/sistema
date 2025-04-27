const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, "database.json");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// 📌 Criar banco de dados JSON caso não exista
function inicializarBanco() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ profissionais: [], plantoes: [] }, null, 2));
    }
}

// 📌 Ler banco de dados com segurança
function lerBanco() {
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    } catch (error) {
        console.error("❌ Erro ao ler o banco de dados:", error);
        return { profissionais: [], plantoes: [] };
    }
}

// 📌 Escrever banco de dados com segurança
function salvarBanco(dados) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(dados, null, 2));
    } catch (error) {
        console.error("❌ Erro ao salvar os dados:", error);
    }
}

// 📡 Rota de status do servidor
app.get("/status", (req, res) => {
    res.json({ status: "Servidor rodando", timestamp: new Date().toISOString() });
});

// 📌 Obter lista de profissionais
app.get("/profissionais", (req, res) => {
    let data = lerBanco();
    res.json(data.profissionais);
});

// 📌 Adicionar um novo profissional
app.post("/profissionais", (req, res) => {
    let data = lerBanco();
    data.profissionais.push(req.body);
    salvarBanco(data);
    res.json({ success: true, message: "✅ Profissional cadastrado com sucesso!" });
});

// 📌 Remover profissional
app.delete("/profissionais/:nome", (req, res) => {
    let data = lerBanco();
    let nome = req.params.nome;
    let novosProfissionais = data.profissionais.filter(prof => prof.nome !== nome);

    if (novosProfissionais.length === data.profissionais.length) {
        return res.status(404).json({ success: false, message: "❌ Profissional não encontrado!" });
    }

    data.profissionais = novosProfissionais;
    salvarBanco(data);
    res.json({ success: true, message: "✅ Profissional removido com sucesso!" });
});

// 📌 Obter lista de plantões
app.get("/plantoes", (req, res) => {
    let data = lerBanco();
    res.json(data.plantoes);
});

// 📌 Adicionar um novo plantão
app.post("/plantoes", (req, res) => {
    let data = lerBanco();
    data.plantoes.push(req.body);
    salvarBanco(data);
    res.json({ success: true, message: "✅ Plantão cadastrado com sucesso!" });
});

// 📌 Remover plantão
app.delete("/plantoes/:id", (req, res) => {
    let data = lerBanco();
    let id = req.params.id;
    let novosPlantoes = data.plantoes.filter((p, index) => index.toString() !== id);

    if (novosPlantoes.length === data.plantoes.length) {
        return res.status(404).json({ success: false, message: "❌ Plantão não encontrado!" });
    }

    data.plantoes = novosPlantoes;
    salvarBanco(data);
    res.json({ success: true, message: "✅ Plantão removido com sucesso!" });
});

// 📌 Inicializar banco de dados e rodar servidor
inicializarBanco();
app.listen(PORT, () => console.log(`🔥 Servidor rodando em http://localhost:${PORT}`));
