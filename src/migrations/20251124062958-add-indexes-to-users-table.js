"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("User", ["date", ""]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("User", ["email"]);
  },
};
