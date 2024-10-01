'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('locais',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        nome: {
          allowNull: false,
          type: Sequelize.STRING
        }, 

        descricao: {
          allowNull: false,
          type: Sequelize.STRING
        },

        localidade: {
          allowNull: false,
          type: Sequelize.STRING
        },

        cep: {
          allowNull: false,
          type: Sequelize.STRING
        },

        usuarios_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'usuarios',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        coordenadas: {
          allowNull: false,
          type: Sequelize.STRING
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

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('locais');
  }
};
