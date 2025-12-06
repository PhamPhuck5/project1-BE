"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("tasks", ["userId", "week"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("tasks", ["userId", "week"]);
  },
};
