//librerías necesarias
const express = require("express");
const { Router } = express;

//class
const Carrito = require("../classes/carrito.js");
const shopCart = new Carrito("./db/carrito.txt");

//carrito

async function listAll(req, res) {
  const resultado = await shopCart.getAll();
  return res.send(resultado);
};

async function listById(req, res) {
  const resultado = await shopCart.getById(req.params.id);
  return res.send(resultado);
}

async function createCart(req, res) {
  const resultado = await shopCart.save();
  return res.send(resultado);
}

async function addProduct(req, res) {
  const resultado = await shopCart.addProduct(req.params.id, req.body.cantidad);
  return res.send(resultado);
}

async function deleteCart(req, res) {
  const resultado = await shopCart.delete(req.params.id);
  return res.send(resultado);
}

async function removeProductById(req, res) {
  const resultado = await shopCart.deleteProductById(
    req.params.id,
    req.params.id_prod
  );
  return res.send(resultado);
}

module.exports = { listAll, listById, createCart, addProduct, deleteCart, removeProductById }