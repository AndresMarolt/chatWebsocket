require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path');
const { Server: IOServer } = require('socket.io');
const expressServer = app.listen(port, err => {
    err ? console.log(`There was an error initializing server: ${err}`)
        : console.log(`Server listening to port ${port}`)
})
const io = new IOServer(expressServer);
const messages = [];

// INDICAR LA UBICACION DE LOS ARCHIVOS ESTATICOS:
app.use(express.static(path.join(__dirname, '/public')));

// ATAJAR LAS CONEXIONES:
io.on('connection', socket => {
    console.log(`Se conectó un usuario (${socket.id})`);

    io.emit('server:message', messages);                                // ENVIA LOS MENSAJES QUE HAYAN HABIDO EN LA CONVERSACION ANTES DE ABRIR EL CLIENTE

    socket.on('client:message', messageData => {                        // ATAJA LOS MENSAJES RECIBIDOS DESDE EL CLIENTE
        messages.push(messageData);
        io.emit('server:message', messages);                            // ACTUALIZA EL ARRAY DE MENSAJES Y LO ENVIA AL CLIENTE
    })
})