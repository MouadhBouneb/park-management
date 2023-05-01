'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Vehicule)
      this.hasMany(models.Reservation)
      this.hasMany(models.Rapport)
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    // role : "SUPERADMIN","ADMIN","CONDUCTEUR"
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};