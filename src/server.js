require('dotenv').config({path: 'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json())
server.use('/api', routes);

server.listen(process.env.PORT, () => {
    console.log('servidor rodando na porta ' + process.env.PORT)
})