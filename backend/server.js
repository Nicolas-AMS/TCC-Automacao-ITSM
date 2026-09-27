require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- ADICIONADO: Necessário para manipular caminhos de pastas

const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const chamadosRoutes = require('./routes/chamados');
const diagnosticoRoutes = require('./routes/diagnostico');
const agenteRoutes = require('./routes/agente');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// <-- ADICIONADO: Serve os arquivos da pasta frontend como raiz do site
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/chamados', chamadosRoutes);
app.use('/api/diagnostico', diagnosticoRoutes);
app.use('/api/agente', agenteRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Middleware de erro deve ser o ultimo
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ITSM rodando em http://localhost:${PORT}`);
});
