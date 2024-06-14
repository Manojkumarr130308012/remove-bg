
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const middleware=require('./middleware/middleware')
app.use(middleware);
app.listen(port, () => console.log(`url-shortener listening on port 3000`));