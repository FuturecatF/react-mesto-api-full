const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

const { login, createUser } = require('./controllers/users');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const pageNotFoundRouter = require('./routes/pageNotFound');

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(errors());
app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

app.use('/', pageNotFoundRouter);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
app.listen(PORT, () => {
  console.log(`Сервер запустился на порту ${PORT}`);
});
