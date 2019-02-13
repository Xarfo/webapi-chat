const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hub-router.js');

const server = express();

function teamNamer(req, res, next) {
  req.team = 'Web XVI';

  next();
}

// global middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(teamNamer);

server.use('/api/hubs', restricted('joe'), hubsRouter);

server.get('/', restricted('po'), async (req, res, next) => {
  if (req.headers.name === 'po') {
    res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.headers.name}, to the Lambda Hubs API</p>
    `);
  } else {
    next('any argument will trigger the next error handling middleware');
  }
});

server.use(errorHandler);

// implementation
function restricted(name) {
  return function(req, res, next) {
    const personName = req.headers.name;

    if (personName === name) {
      next();
    } else {
      res
        .status(401)
        .json({ message: 'Please login to access this information' });
    }
  };
}

function moodyGateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).json({ you: 'shall not pass!' });
  } else {
    next();
  }
}

function errorHandler(error, req, res, next) {
  res.status(400).json({ message: 'Bad Panda!', error });
}
// server.use(moodyGateKeeper);
// server.use((req, res) => {
//   res.status(404).send("Ain't nobody got time for that!");
// });

// export default server; ES2015 Modules
module.exports = server;
