const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const header = req.headers['authorization'];

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token ausente' });
  }

  const token = header.split(' ')[1];

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = autenticar;