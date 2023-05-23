const {Sequelize,Op}=require('sequelize');
var db = require('../models/index');
// const tags = require('../models/tags');
// const users = require('../models/users');
// const  comment = require('../models/comments');
// const   image = require('../models/image');
// const  video = require('../models/videos');


// var Users = db.users;
// var paranoidUser = async (req,res)=>{
//   // var data = await Users.create({firstName:'rutvi', lastName:'patel'})
//   //force:true will do the hard delete
//   // var data=await Users.destroy({
//   //   where: {
//   //     id: 2
//     // },// force:true //it will do the hard delete
//   // });
// // var data = await Users.restore({where:{
// //   id:2
// // }});//it will restore the data ..if we donot give condition it will be applicable to all the data
// // var data = await Users.findAll({});//here it will not show the data which are soft deleted
// // var data = await Users.findAll({paranoid:false});// this will show all the data 
// var data = await Users.findByPk(2,{paranoid:false});
// res.status(200).json({data:data});
// }
// module.exports={paranoidUser}

const Image = db.image;
const Comment = db.comments;
const Video = db.videos;
const Tags = db.tags;
const tag_taggable = db.tag_taggable;


var polymorphic = async (req,res)=>{

  //image-to-comment-----------
  // let data = await Image.findAll({
  //   include:[{
  //     model:Comment
  //   }]
  // })

  //video-to-comment-----------
  // let data = await Video.findAll({
  //   include:[{
  //     model:Comment
  //   }]
  // })

  //comment to video-------------
let data = await Comment.findAll({
    include:[Image,Video]
  })
  res.status(200).json({data:data});
}


var polymorphicMany = async(req,res)=>{
  // for image  to tag----

  // let data = await Image.findAll({
  //   include:[Tags]
  // });

  //for video to tag--------

//  let data = await Video.findAll({
//     include:[Tags]
//   });

//Tag to video or image
let data = await Tags.findAll({
  include:[Video,Image]
})
  res.status(200).json({data:data});
}
module.exports={polymorphic,polymorphicMany}