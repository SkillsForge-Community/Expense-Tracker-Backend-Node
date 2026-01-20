const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`listening on port http//localhost:${port}`);
});

module.exports = app;

