const defaultConfig = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
};

module.exports = {
  development: {
    ...defaultConfig,
    database: `${defaultConfig.database}_dev`,
  },
  test: {
    ...defaultConfig,
    database: `${defaultConfig.database}_test`,
  },
  production: defaultConfig,
};
