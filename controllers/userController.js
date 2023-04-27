const {Sequelize,Op}=require('sequelize');
var db = require('../models/index');
const users = require('../models/users');
var Users = db.users;
var paranoidUser = async (req,res)=>{
  // var data = await Users.create({firstName:'rutvi', lastName:'patel'})
  //force:true will do the hard delete
  // var data=await Users.destroy({
  //   where: {
  //     id: 2
    // },// force:true //it will do the hard delete
  // });
// var data = await Users.restore({where:{
//   id:2
// }});//it will restore the data ..if we donot give condition it will be applicable to all the data
// var data = await Users.findAll({});//here it will not show the data which are soft deleted
// var data = await Users.findAll({paranoid:false});// this will show all the data 
var data = await Users.findByPk(2,{paranoid:false});
res.status(200).json({data:data});
}
module.exports={paranoidUser}