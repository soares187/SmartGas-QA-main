const express = require('express');
const cors = require('cors');
const app = express();
const sensorRouter = require('./routes/sensor');

app.use(cors());

// Essencial para o Express conseguir ler o JSON do ESP32 e do Front-end
app.use(express.json());

// Vincula a rota que criamos acima
app.use('/api/sensor', sensorRouter);

app.use(express.static('routes/public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} e guardando dados na memória!`);
});