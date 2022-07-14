
const express = require('express');
const app = express();
const router = require('./routes');
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
