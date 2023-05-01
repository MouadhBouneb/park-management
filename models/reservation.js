'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Vehicule)
      this.belongsTo(models.User)
    }
  }
  Reservation.init({
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    status: DataTypes.INTEGER // 1 en attente | 2 validé  
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};