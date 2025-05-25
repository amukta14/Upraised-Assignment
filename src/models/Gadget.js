const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Gadget = sequelize.define('Gadget', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  codename: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
    defaultValue: 'Available'
  },
  decommissionedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true
});

// Instance method to calculate mission success probability
Gadget.prototype.calculateMissionSuccessProbability = function() {
  return Math.floor(Math.random() * 100);
};

// Static method to generate a random codename
Gadget.generateCodename = function() {
  const adjectives = ['The', 'Mighty', 'Silent', 'Swift', 'Deadly', 'Mysterious'];
  const nouns = ['Nightingale', 'Kraken', 'Phoenix', 'Shadow', 'Eagle', 'Viper'];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${randomAdjective} ${randomNoun}`;
};

// Static method to generate a self-destruct code
Gadget.generateSelfDestructCode = function() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

module.exports = Gadget; 