const express = require('express');
const router = express.Router();

// Objeto que guarda o estado atual do sensor na memória do Node.js
let estadoAtualDosSensor = {
    status: "Ar Limpo",
    ppm: 120, // Começa com um valor seguro padrão
    ultimaAtualizacao: new Date().toLocaleTimeString()
};

// 1. ROTA QUE O ESP32 VAI CHAMAR (POST)
router.post('/', (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: 'O campo status é obrigatório.' });
    }

    // Limpa espaços em branco invisíveis que possam vir do Arduino
    const textoStatus = String(status).trim();
    let valorPPM = 120; // Valor padrão para Ar Limpo

    // Se o Arduino mandar algo diferente de "Ar Limpo", mudamos o PPM para simular o perigo
    if (textoStatus !== 'Ar Limpo') {
        valorPPM = 1150; // Um valor alto que vai ativar a tela vermelha de PERIGO CRÍTICO!
    }

    estadoAtualDosSensor = {
        status: textoStatus,
        ppm: valorPPM, // Injeta o valor numérico que o Front-end precisa
        ultimaAtualizacao: new Date().toLocaleTimeString()
    };

    console.log(`[ESP32] Novo estado recebido: ${textoStatus} (${valorPPM} PPM) às ${estadoAtualDosSensor.ultimaAtualizacao}`);

    res.status(200).json({ message: 'Estado atualizado na memória!' });
});

// 2. ROTA QUE A SUA TELA (FRONT-END) VAI CHAMAR para ler o valor atual
router.get('/atual', (req, res) => {
    res.json(estadoAtualDosSensor);
});

module.exports = router;