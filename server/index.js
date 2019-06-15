const express = require('express');
const app = express();

const router = express.Router();
const goodsData = require('./../mock/goods.json');

router.get("/goods", function (req, res, next) {
  res.json(goodsData);
})

app.use(router);

app.listen(4000);
