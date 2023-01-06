//librerías necesarias
const express = require("express");
const { Router } = express;

//class
const Contenedor = require("../classes/productos.js");
const catalogo = new Contenedor("./db/productos.txt");

//productos

async function listAll(req, res) {
    const resultado = await catalogo.getAll();
    return res.send(resultado);
};

async function listById(req, res) {
    let { id } = req.params;
    const resultado = await catalogo.getById(id);
    return res.send(resultado);
};

async function createProduct(req, res) {
    const resultado = await catalogo.save(req.body);
    return res.send(resultado);
};

async function modifyProduct(req, res) {
    const resultado = await catalogo.update(req.body, req.params.id);
    return res.send(resultado);
};

async function deleteProduct(req, res) {
    const resultado = await catalogo.deleteById(req.params.id);
    return res.send(resultado);
}

module.exports = { listAll, listById, createProduct, modifyProduct, deleteProduct }