//librerías necesarias
const express = require("express");
const { Router } = express;
const fs = require("fs");

//implementación de servidor
const app = express();
const productos = express.Router();
const carrito = express.Router();
const usuarios = express.Router();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

//class
const Contenedor = require("./classes/productos.js");
const catalogo = new Contenedor("./db/productos.txt");
const Usuarios = require("./classes/users.js");
const user = new Usuarios("./db/users.txt");
const Carrito = require("./classes/carrito.js");
const shopCart = new Carrito("./db/carrito.txt");

//app.use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productos);
app.use("/api/carrito", carrito);
app.use("/api/usuarios", usuarios);
app.use(express.static("public"));

//productos
productos.get("/", async (req, res) => {
  const resultado = await catalogo.getAll();
  return res.send(resultado);
});

productos.get("/:id", async (req, res) => {
  let { id } = req.params;
  const resultado = await catalogo.getById(id);
  return res.send(resultado);
});

productos.post("/", async (req, res) => {
  const resultado = await catalogo.save(req.body);
  return res.send(resultado);
});

productos.put("/:id", async (req, res) => {
  const resultado = await catalogo.update(req.body, req.params.id);
  return res.send(resultado);
});

productos.delete("/:id", async (req, res) => {
  const resultado = await catalogo.deleteById(req.params.id);
  return res.send(resultado);
});

//usuarios
usuarios.get("/", async (req, res) => {
  const resultado = await user.getAll();
  return res.send(resultado);
});

usuarios.get("/:id", async (req, res) => {
  const resultado = await user.getById(req.params.id);
  return res.send(resultado);
});

usuarios.post("/", async (req, res) => {
  const resultado = await user.save(req.body);
  return res.send(resultado);
});

usuarios.put("/:id", async (req, res) => {
  const resultado = await user.update(req.body, req.params.id);
  return res.send(resultado);
});

usuarios.delete("/:id", async (req, res) => {
  const resultado = await user.deleteById(req.params.id);
  return res.send(resultado);
});

usuarios.post('/login', (req, res) =>{
  const resultado = user.userLogged(req.body)
  return res.send(resultado)
})

//carrito
carrito.get("/", async (req, res) => {
  const resultado = await shopCart.getAll();
  return res.send(resultado);
});

carrito.get("/:id/productos", async (req, res) => {
  const resultado = await shopCart.getById(req.params.id);
  return res.send(resultado);
});

carrito.post("/", async (req, res) => {
  const resultado = await shopCart.save();
  return res.send(resultado);
});

carrito.post("/:id/productos", async (req, res) => {
  const resultado = await shopCart.addProduct(req.params.id, req.body.cantidad);
  return res.send(resultado);
});

carrito.delete("/:id", async (req, res) => {
  const resultado = await shopCart.delete(req.params.id);
  return res.send(resultado);
});

carrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const resultado = await shopCart.deleteProductById(
    req.params.id,
    req.params.id_prod
  );
  return res.send(resultado);
});

//default
app.get("*", (req, res) => {
  res.status(404).send("Error 404, ruta no encontrada");
});
