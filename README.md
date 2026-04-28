# Marjorie App 💖

Um aplicativo mobile-first interativo e ultra-estilizado para pedidos de namoro, construído com **React**, **TypeScript** e **Tailwind CSS**.

![Versão Mobile](https://img.shields.io/badge/Mobile-First-pink?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript)

## ✨ Sobre o Projeto

Este projeto foi desenvolvido para transformar um pedido de namoro em uma experiência interativa gamificada. Ele conta a jornada de um casal através de diálogos, expressões pixel-art e um "boss final" onde o botão "Não" foge do usuário!

### 🌟 Funcionalidades Principais

-   **Estética Pixel/Retro**: Interface totalmente inspirada em jogos clássicos com fontes e bordas pixeladas.
-   **Botão Fugitivo Inteligente**: No passo do pedido, o botão "Não" utiliza lógica de viewport para fugir do cursor/toque sem nunca sair da tela.
-   **Captura de GIF em Alta Resolução**: Ao aceitar o pedido, o usuário pode gerar um GIF da tela de conquista em **resolução 3x (1125x2001)** para compartilhar em redes sociais.
-   **Efeitos Sonoros**: Sons de clique fofos que acompanham a navegação.
-   **Mobile-First**: Otimizado para telas de smartphones (375x812+).

## 🛠️ Tecnologias Utilizadas

-   **Frontend**: [React 19](https://react.dev/)
-   **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
-   **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Processamento de Imagem**: [GIF.js](https://jnordberg.github.io/gif.js/) (para geração do GIF no lado do cliente)
-   **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Como Iniciar

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU-USUARIO/marjorie-app.git
cd marjorie-app
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O servidor abrirá em `http://localhost:5173`. Para testar no celular, use o endereço de `Network` mostrado no terminal.

## 📁 Estrutura de Pastas

-   `/src/steps`: Contém os componentes de cada etapa da jornada.
-   `/src/components`: UI components reutilizáveis (botões, janelas, partículas).
-   `/src/assets`: Gerenciamento centralizado de imagens e assets.
-   `/public`: Assets estáticos e o web-worker do GIF.js.

---
Desenvolvido com carinho para um momento especial. ✨🎮
