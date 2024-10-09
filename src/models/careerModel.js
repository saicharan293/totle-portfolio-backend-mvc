const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Import Sequelize instance

const Career = sequelize.define('Career', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'CAREERS', // Map to your existing table name
  timestamps: false,    // Disable timestamps if you're not using createdAt/updatedAt
});

module.exports = Career;
