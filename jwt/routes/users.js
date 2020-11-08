var express = require('express');
var router = express.Router();
const  [insertUser, getUser, getUsers, updateUser, deleteUser] = require('../controller/user');
var middleware = require("../middleware.js");

/* GET users listing. */
router.get('/', middleware.checkToken, async function(req, res, next) {
  let users = await getUsers();
  res.send(users);
});

/* Insertar un usuario a la aplicacion */
router.post('/create',middleware.checkToken, function(req, res){
  let respuesta = insertUser(req.body); 
  res.send(respuesta);
});
/* eliminar un usuario a la aplicacion */
router.post('/delete/:usuario',middleware.checkToken, middleware.isAdmin, function(req, res){
    let respuesta = deleteUser(req.params.usuario);
    res.send(respuesta);
});


module.exports = router;
