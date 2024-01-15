// Importaciones de módulos necesarios
const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

// Definición de la tienda (almacén de datos en memoria)
let store = {}
store.accounts = []

// Creación de la aplicación Express
let app = express()

// Middleware para el análisis del cuerpo de la solicitud (request body)
app.use(bodyParser.json())

// Middleware para el registro de solicitudes (logging)
app.use(logger('dev'))

// Middleware para el manejo de errores
app.use(errorhandler())



app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts)
})

app.post('/accounts', (req, res) => {
    let newAccount = req.body
    let id = store.accounts.length
    store.accounts.push(newAccount)
    res.status(201).send({id: id})
})
app.get('/accounts/:id', (req, res) => {
    let id = parseInt(req.params.id); // Convertir el ID a un número entero
    let selectAccount = store.accounts[id];

    if (selectAccount) {
        res.status(200).send(selectAccount);
    } else {
        res.status(404).send("Account not found");
    }
});


app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body
    res.status(200).send(store.accounts[req.params.id])
})

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id, 1)
    res.status(204).send()
})

app.listen(3000)