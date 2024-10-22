// const { Pool } = require('pg');
import pkg from 'pg';
const { Pool } = pkg;

// Define your PostgreSQL connection details
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // Or your PostgreSQL server address
  database: 'rickandmorty',
  password: 'Prolific1',
  port: 5432, // Default PostgreSQL port
});

// Export the pool to use in other files
