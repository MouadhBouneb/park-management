'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Vehicule)
      this.belongsTo(models.User)
    }
  }
  Cout.init({
    prix: DataTypes.FLOAT,
    operation: DataTypes.STRING,
    description: DataTypes.STRING,
    idPayed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cout',
  });
  return Cout;
};