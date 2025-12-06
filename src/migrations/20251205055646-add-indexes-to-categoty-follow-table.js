"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("user_categories", ["categoryId", "userId"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("user_categories", [
      "categoryId",
      "userId",
    ]);
  },
};
