const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a MySQL connection without specifying a database
const mysqlConnection = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, { logging: false });

(async () => {
  try {
    // Authenticate the MySQL connection
    await mysqlConnection.authenticate();
    // console.log('Connection to MySQL server has been established successfully.');

    // Create the database if it does not exist
    const dbName = process.env.DB_NAME;
    await mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    // console.log(`Database "${dbName}" created or already exists.`);

    await sequelize.authenticate();
    // console.log('Connection to the database has been established successfully.');
    
    // Synchronize the models to create tables
    await sequelize.sync({ alter: true }); // Use { force: true } to drop existing tables
    // console.log('All tables were synchronized successfully.');

    // Close the MySQL connection after creating the database
    await mysqlConnection.close();
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
})();

// Initialize Sequelize with the created database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Set to true to log SQL queries
});

module.exports = sequelize;
