require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./databaseConfig');
connectDB();

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

const PORT = process.env.LOCALHOST_PORT;
app.listen(PORT);
console.log('app running is: ', PORT);
