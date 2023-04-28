const {Sequelize,Op}=require('sequelize');
var db = require('../models/index')
const users = require('../models/users');
const contacts =require('../models/contact');
var Users = db.users;
var Contacts = db.contact;
var getOneToOne= async(req,res)=>{
  const data = await Users.findAll({
    attributes:['firstName','lastName'],
    include:[{
      model:Contacts,
      attributes:['parmanent_address','current_address']
    }]
  });//select * from....

  res.status(200).json({data:data});
}
var OneToOne = async(req,res)=>{

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
module.exports={getOneToOne,OneToOne}