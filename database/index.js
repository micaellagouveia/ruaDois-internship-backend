const { Client } = require('pg');
const databaseConfig = require('./config');

const nodeEnv = process.env.NODE_ENV || 'development';
const config = databaseConfig[nodeEnv];

const sleep = () => new Promise(resolve => setTimeout(resolve, 5000));

const connect = async (retry) => {
  console.log('Attempt to connect into database...');

  console.log('AQUI ' + config)
  const client = new Client({
    user: config.username,
    host: config.host,
    database: 'postgres',
    password: config.password,
  });

  client.connect((error) => {
    client.end();

    if (error) {
      console.error('Failed to connect into database!');
      retry(retry);
    } else {
      console.log('Connected!');
    }
  });
};

const retry = async (self) => {
  console.log('Performing new attempt in 5 seconds.');
  await sleep();
  connect(self);
};

connect(retry);
