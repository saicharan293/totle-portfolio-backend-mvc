const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Ensure this imports the correct sequelize instance

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'CONTACT_US', // Optionally specify the table name
  timestamps: false,
});

module.exports = Contact;
