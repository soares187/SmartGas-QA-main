const API = 'http://localhost:3001';

export const cadastrar = async (email, senha) => {
  const response = await fetch(`${API}/auth/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  return response.json();
};

export const login = async (email, senha) => {
  const response = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  return response.json();
};