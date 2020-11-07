var express = require('express');
var router = express.Router();
const users = require('../controller/user');
var middleware = require("../middleware.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Insertar un usuario a la aplicacion */
router.post('/create', middleware.checkToken,function(req, res){
  let user = req.body; 
  if(user.rol == 'admin')  {
    let respuesta = users.insertUser(req.body);
    res.send(respuesta);
  }
  else{
    res.sendStatus(403);
  }
});

module.exports = router;
