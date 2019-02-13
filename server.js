const express = require('express'); // importing a CommonJS module

const hubsRouter = require('./hubs/hub-router.js');

const server = express();

server.use(express.json());

server.use('/api/hubs', hubsRouter);

server.get('/', async (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

// export default server; ES2015 Modules
module.exports = server;