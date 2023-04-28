const {Sequelize,Op}=require('sequelize');
var db = require('../models/index')
const users = require('../models/users');
const contacts =require('../models/contact');
var Users = db.users;
var Contacts = db.contact;
//----------------------------------------------------------------
var getOneToOne= async(req,res)=>{
  const data = await Users.findAll({
    attributes:['firstName','lastName'],
    include:[{
      model:Contacts,
      attributes:['parmanent_address','current_address']
    }]
  });//select * from....leftouter join by default

  res.status(200).json({data:data});
}
var oneToOne = async(req,res)=>{

  //to create the entry in contacts and users table .
// var data = await Users.create({firstName:'taksh',lastname:'patel'})
  

// if(data && data.id){
//  await Contacts.create({parmanent_address:'mangalam',current_address:'dhananjaybanglow',user_id:data.id})
// }

//to update the entry in contacts and users table .
var data = await Users.update({
  firstName:'deep',lastname:'pathak'},
  {where: {
  firstName: 'ekta'}
})
  

if(data && data.id){
 await Contacts.update({parmanent_address:'mangalamsociety',current_address:'dhananjaybanglow',user_id:data.id},{where: {
  current_address:'dhananjaybanglow'}
})
}
  res.status(200).json({data:data});
}
// --------------------------------------------------------------------------------------

var getOneToMany = async(req,res)=>{  
  const data = await Users.findAll({})
  res.status(200).json({data:data});
}


var oneToMany = async(req,res)=>{
  await Contacts.create({parmanent_address:'pragatinagar',current_address:'sciencecity',user_id:24})
  res.status(200).json({data:1});
}
//----------------------------------------------------------------------------------------
module.exports={getOneToOne,oneToOne,getOneToMany,oneToMany}