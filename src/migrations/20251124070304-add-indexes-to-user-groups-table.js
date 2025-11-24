"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("UserGroup", ["userId", "groupId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("UserGroup", ["userId", "groupId"]);
  },
};
