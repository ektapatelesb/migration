'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    deletedAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
    paranoid:true,
    // hooks:{
    //   beforeValidate:(users,Option)=>{
    //     users.firstName = 'changed  hook'
    //     console.log("hooks called");
    //   },
    //   afterValidate:(users,options)=>{
    //     users.email = 'emailchanged@gmail.com'
    //   }
    // }

  });
  //second method
  // users.addHook('beforeValidate','customname',(users,options)=>{
  //   users.firstName ='new way for hooks';
  // });

  //third method
  // users.afterValidate('myHookLast',(users,options)=>{
  //   users.firstName = 'third hook';
  // })
  return users;
};