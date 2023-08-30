<p align="center">
  <h1 align="center">Marketspace - React Native :rocket:</h1>
</p>

<p align="center" margin-top="25px" >
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/andreviapiana/Marketspace" />

  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/andreviapiana/Marketspace" />
</p>


Marketspace é uma aplicação para você comprar e vender produtos novos e usados.

___

## 💻 Sobre
O Marketspace é uma aplicação onde você pode comprar e vender produtos livremente. Seu funcionamento é semelhante ao MercadoLivre e OLX, onde o usuário cadastrado está apto a anunciar os produtos que deseja vender, sejam eles novos ou usados. As pessoas interessadas então vão poder entrar em contato com o vendedor para realizar a negociação. A Aplicação consome um back-end em Node.js que já incluí alguns anúncios cadastrados como exemplo. 

Pelo lado do Comprador, é possível buscar um produto pelo nome, ou então filtrar os produtos/anúncios de acordo com seu Status(Novo ou Usado), sua Forma de Pagamento, e pela Possibilidade de Troca do produto anunciado, caso o vendedor aceite trocas.

Pelo lado do Vendedor, ao cadastrar um Produto será exigida uma foto do item (com um limite de até 3 fotos), o Nome do item, uma Descrição, o Status do item(Novo ou Usado), o Preço, a Possibilidade de Troca(caso o vendedor aceite trocas por este item), e ainda a Forma de Pagamento que o vendedor aceita. O vendedor está apto ainda a Ativar e Desativar os seus anúncios, e ainda excluir um anúncio, caso deseje. Um anúncio Desativado deixa de aparecer para os demais usuários, e um anúncio Excluído é removido permanentemente do BackEnd. É possível ainda Editar um anúncio que já existe, por exemplo para alterar fotos ou outros dados. Ao remover fotos durante a edição de um produto, a foto antiga é permanentemente apagada do BackEnd evitando que arquivos "perdidos" permaneçam no servidor.

A aplicação conta com um sistema de cadastro de usuários 100% funcional, fazendo uso de tokens de autenticação. Sem o cadastro o usuário não terá acesso a plataforma.

___

## 🎨 Layout
Imagens da aplicação são vistas abaixo:

<img width="1920" alt="Cover" src="https://github.com/andreviapiana/DailyDiet/assets/106932234/58f77ba5-d785-48ba-b11d-64f7eef74b01">

___

## 🛠 Tecnologias

As seguintes tecnologias foram empregadas na criação deste projeto:

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [NativeBase](https://nativebase.io/)
- [ESLint](https://eslint.org/)
- [Styled Components](https://styled-components.com/docs/basics)
- [Async Storage](https://reactnative.dev/docs/asyncstorage)
- [React Navigation](https://reactnavigation.org/)
- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator/)
- [Expo Google Fonts](https://github.com/expo/google-fonts)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [React Navigation Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator/)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [React Hook Form](https://www.react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)

___

## 🚀 Como utilizar

Clone o projeto para o local desejado em seu computador.

```bash
$ git clone git@github.com:andreviapiana/Marketspace.git
```
___

#### 🚧 Executando o Back-end
```bash

# Navegue até o diretório
$ cd api

# Instale as dependências necessárias
$ npm install

# Agora inicie o servidor do back-end
$ npm run dev

# O servidor irá rodar na porta 3333 com o aviso: "Server is running on Port 3333".

```
___

#### 🚧 Executando o Front-end
```bash

# Com o back-end rodando, abra um novo terminal e navegue até o diretório
$ cd mobile

# Instale as dependências necessárias
$ npm install

# Agora inicie a aplicação - Um QR Code será exibido no Terminal
$ npm run start

# Eu seu celular instale o aplicativo Expo Go - Ele é gratuito na PlayStore.

# Abra o Expo Go que acabou de instalar, e então escaneie o QR Code através do aplicativo.

# A aplicação então será exibida de forma 100% funcional diretamente em seu celular.

```

___

Made with ❤️ by André Viapiana 👋🏽 [Get in Touch!](https://www.linkedin.com/in/andreviapiana/)

---
