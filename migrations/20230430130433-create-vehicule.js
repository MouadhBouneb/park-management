'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marque: {
        type: Sequelize.STRING
      },
      carburant: {
        type: Sequelize.STRING
      },
      serie: {
        type: Sequelize.STRING
      },
      kilometrage: {
        type: Sequelize.INTEGER
      },
      dateExpirationAssurance: {
        type: Sequelize.DATE
      },
      etat: {
        type: Sequelize.STRING
      },
      isDisponible: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehicules');
  }
};