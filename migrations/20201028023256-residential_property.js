'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return await queryInterface.createTable('residential_property', {
      idProperty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      idRealEstate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'real_state',
          key: 'idRealEstate',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      code: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('apartamento', 'casa', 'galpão', 'sala comercial'),
        allowNull: false,
      },
      numberRooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isRented: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {

    return await queryInterface.dropTable('residential_property');
  }
};
