"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("Event", ["groupId", "date"]); //use week
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Event", ["groupId", "date"]);
  },
};
