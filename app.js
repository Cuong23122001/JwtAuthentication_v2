require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
require('./databaseConfig');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api', routes);

app.use((err, req, res, next) => {
  if (err == 'Token invalid') {
    return res.json(err);
  }
  next();
});

const PORT = process.env.PORT || 2111;
app.listen(PORT);
console.log('app running is: ', PORT);
