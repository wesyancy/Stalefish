const { Client } = require('pg');

const { DATABASE_URL } = process.env;

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "graceShopper",
    password: "password",
    port: 5432,
    // connectionString: DATABASE_URL,
})

module.exports = { client }