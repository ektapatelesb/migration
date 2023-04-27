
'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
const todos = [...Array(100)].map((todo) => (
  {
    firstName: faker.lorem.words(),
    lastName: faker.lorem.words(),
    email:faker.internet.email(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees', todos, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
