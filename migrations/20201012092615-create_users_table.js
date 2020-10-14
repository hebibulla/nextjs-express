'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE 
    });
    // await queryInterface.createTable('users',
    //   { 
    //     id: {
    //       type: Sequelize.INTEGER,
    //       autoIncrement: true,
    //       primaryKey: true,
    //       allowNull: false,
    //     },
    //     user_name: {
    //       type: SequelizeSTRING,
    //       unique: true,
    //       allowNull: false
    //     } 
    //   }
    // );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
