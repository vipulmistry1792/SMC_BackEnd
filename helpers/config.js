const env = process.env;

const config = {
  db: { 
    user:env.DB_USER ||'sa',
    password:env.DB_PASSWORD || 'Velox@123',
    server:env.DB_HOST || '27.54.167.56',
    database:env.DB_NAME || 'SMC_SCADA',
  	port:env.DB_PORT || 1433,
  	encrypt: false

  },
  db1: { 
    user:env.DB_USER ||'sa',
    password:env.DB_PASSWORD || 'Velox@123',
    server:env.DB_HOST || '27.54.167.56',
    database:env.DB_NAME1 || 'SMC_SCADA',
  	port:env.DB_PORT || 1433,
  	encrypt: false

  },
  listPerPage: env.LIST_PER_PAGE || 30,
};
  
module.exports = config;
