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
    res.status(201).send({ id: id })
})

app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id] = req.body
    res.status(200).send(store.accounts[req.params.id])
  })

  app.delete('/accounts/:id', (req, res) => {
  store.accounts.splice(req.params.id, 1)
  res.status(204).send()
})

app.get('/accounts/:id', (req, res) => {
    const accountId = req.params.id;
    
    // Verificar si la cuenta existe en el almacenamiento
    const account = store.accounts[accountId];
  
    if (account) {
      // Devolver la cuenta si se encuentra
      res.status(200).send(account);
    } else {
      // Devolver un código 404 si la cuenta no se encuentra
      res.status(404).send("Account not found");
    }
  });

app.listen(3000)