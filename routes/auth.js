const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const db      = require('../db');

const router = express.Router();
const SALT_ROUNDS = 10;

// POST /auth/cadastro
router.post('/cadastro', async (req, res) => {
  console.log('Requisição de cadastro recebida:', req.body); // <- adiciona aqui
  const { email, senha } = req.body;
  

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha obrigatórios' });
  }

  if (senha.length < 6) {
    return res.status(400).json({ erro: 'Senha mínima de 6 caracteres' });
  }

  try {
    const senha_hash = await bcrypt.hash(senha, SALT_ROUNDS);

    db.prepare(
      'INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)'
    ).run(email, senha_hash);

    res.status(201).json({ mensagem: 'Usuário criado com sucesso' });

  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const usuario = db
    .prepare('SELECT * FROM usuarios WHERE email = ?')
    .get(email);

  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const senhaOk = await bcrypt.compare(senha, usuario.senha_hash);

  if (!senhaOk) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token });
});

module.exports = router;