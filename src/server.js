'use strict';

const express = require ('express');
const cors = require ('cors');

const { router } = require('./routes/routes');
const { authRouter } = require('./routes/routes');
const PORT = process.env.PORT;

const notFound = require('../error-handlers/404');
const errorHandler = require('../error-handlers/500');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use('/api/v1', router);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  app,
  start: () => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
