"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("events", ["categoryId", "date"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("events", ["categoryId", "date"]);
  },
};
