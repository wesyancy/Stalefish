const { Client } = require('pg');

const { DATABASE_URL } = process.env;

const client = new Client({
    user: "stalefish_user",
    host: "dpg-ce98oqhgp3jtsam8hqh0-a",
    database: "stalefish",
    password: "ghNHr5sQHvkXMYAihp7acjS9Ku9JWmAM",
    port: 5432,
    // connectionString: DATABASE_URL,
})

module.exports = { client }