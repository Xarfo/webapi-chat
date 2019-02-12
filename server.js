const express = require('express');

const HubsRoute = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());

server.use('/api/hubs', hubRouter); //delegates 

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});




// Export default server ES6  Modules
module.exports = server;