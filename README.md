# SmartGas QA — Guia para Avaliação

## Estrutura do Projeto

Após baixar e extrair o arquivo, a estrutura ficará assim:

```
SmartGas-QA-main/
  └── SmartGas-QA-main/      ← PASTA DO APP MOBILE (entrar aqui para o app)
        ├── Api/              ← PASTA DO BACKEND (entrar aqui para a API)
        ├── src/
        ├── app/
        ├── assets/
        └── app.json
```

> ⚠️ A pasta aparece duplicada por conta do download do GitHub. Isso é esperado.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)
- Aplicativo **Expo Go** instalado no celular (disponível na App Store e Google Play)
- Celular e computador na **mesma rede Wi-Fi**

---

## Passo 1 — Rodar o Backend (API)

Abra um terminal e execute os comandos abaixo:

```bash
cd SmartGas-QA-main
npm install
node server.js
```

✅ O servidor estará rodando em: `http://localhost:3000`

Deixe esse terminal aberto.

---

## Passo 2 — Rodar o App Mobile

Abra um **segundo terminal** e execute:

```bash
cd SmartGas-QA-main\SmartGas-QA-main
npm install
npx expo start
```

✅ Um QR Code aparecerá no terminal.

Abra o **Expo Go** no celular e escaneie o QR Code.

---

## Passo 3 — Fazer Login no App

Na tela de login, utilize as seguintes credenciais:

| Campo | Valor de exemplo |
|-------|-----------------|
| E-mail | qualquer@gmail.com |
| Senha | qualquer senha com 6 dígitos (ex: 123456) |

> Os dados de login são validados apenas por formato, não há banco de dados de usuários.

---

## Resumo rápido

| O que rodar | Pasta | Comando |
|---|---|---|
| Backend (API) | `SmartGas-QA-main` | `node server.js` |
| App Mobile | `SmartGas-QA-main\SmartGas-QA-main` | `npx expo start` |
