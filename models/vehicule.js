'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.hasMany(models.Cout)
      this.hasMany(models.Reservation)
      this.hasMany(models.Rapport)
    }
  }
  Vehicule.init({
    marque: DataTypes.STRING,
    carburant: DataTypes.STRING,
    serie: DataTypes.STRING,
    kilometrage: DataTypes.INTEGER,
    dateExpirationAssurance: DataTypes.DATE,
    etat: DataTypes.STRING,
    isDisponible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Vehicule',
  });
  return Vehicule;
};