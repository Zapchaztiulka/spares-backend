# Back-end to manage common requests for spare parts store "Zapchaztiulka"

## Бек-енд застосунок для роботи клієнтського застосунку [Zapchaztiulka](https://zapchaztiulka-catalog-frontend.vercel.app/) та [Адмінпанелі](https://admin-panel-frontend-three.vercel.app/) менеджерів магазину

## Матеріали та інструменти

- [Node.js](https://nodejs.org/en) - програмна платформа для створення серверної частини застосунків проекту "Zapchaztiulka"
- [Express.js](https://expressjs.com/ru/) - веб-фреймворк для Node.js
- [Mongoose](https://mongoosejs.com/docs/guide.html) - з метою моделювання об’єктів mongodb для node.js
- [MongoDB](https://www.mongodb.com/) - програма для баз даних NoSQL
- репозиторій - [repository](https://github.com/Zapchaztiulka/spares-backend)
- сервер для деплою - [deploy server](https://spares-backend-i2mq.onrender.com)

- додаткові пакети:
  - [Socket.io](https://socket.io/docs/v4/client-installation/) - для обміну повідомленнями між клієнтськими застосунками
  - [Cloudinary](https://cloudinary.com/documentation/react_integration) - платформа API для збереження зображень та відео
  - [SendGrid API](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication) - платформа API для відправки e-mail

## Для роботи з репозиторієм

1. Склонувати репозиторій:

```bash
git clone https://github.com/Zapchaztiulka/spares-backend.git
```

2. Встановити усі пакети та залежності:

```bash
npm install
```

3. Сторити файл змінних оточення .env, заповнити його необхідними змінними.
    
4. Запусти режим розробки, виконавши команду 

```bash
npm run dev
```
