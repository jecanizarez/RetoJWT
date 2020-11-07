var express = require('express');
var router = express.Router();
var [getProducts, insertProduct] = require('../controller/product');

/* GET product listing. */
router.get('/', async function (req, res, next) {
  const products = await getProducts();
  console.warn('products->', products);
  res.send(products);
});
/**
 * POST product
 */
router.post('/', async function (req, res, next) {
  const newProduct = await insertProduct(req.body);
  console.warn('insert products->', newProduct);
  res.send(newProduct);
});

module.exports = router;
