const {Sequelize,Op}=require('sequelize');
const { sequelize } = require('../models/index');
var db = require('../models/index');
// const user = require('../models/user');
// const contacts =require('../models/contact');

// const tags = require('../models/tags');
// const users = require('../models/users');
// const  comment = require('../models/comments');
// const   image = require('../models/image');
// const  video = require('../models/videos');


var Users = db.users;
var Contacts = db.contact;
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
const Customers = db.customers;
const Profile = db.profile;
const Player = db.Player;
const Game = db.Game;
const Team = db.Team;
const GameTeam = db.gameTeam;
const PlayerGameTeam = db.playerGameTeam;
// const tag_taggable = db.tag_taggable;


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

var scopes = async(req,res)=>{
  let data = await Users.scope('checkdata').findAll({})
  res.status(200).json({data:data});

}

var loadingUser = async(req,res)=>{
  // var data = await Users.create({firstName:'maitri',lastName:'oza'})
  // if(data && data.id){
  //  var data1= await Contacts.create({'parmanent_address':'vadnagar','current_address':'goa','userId':data.id})
  // }
  var data = await Contacts.findAll({
   
    include:[{model:Users}]
  })
 
  res.status(200).json({data:data})
}

var createUsers = async(req,res)=>{
//for inserting single data in two tables-------

  //  await Contacts.create({
  //   parmanent_address : 'dahod',
  //   current_address: 'chanashma',
  //   users:{
  //     firstName:'krupal',
  //     lastName:'kumar'
  //   }
  //  },{
  //   include:[db.contactUser]
  //  })

  //for inserting multiple data in two tables-------

    await Contacts.bulkCreate([{
      parmanent_address : 'denap',
      current_address: 'visnagar',
      users:{
        firstName:'palak',
        lastName:'roy'
      }
     },{
      parmanent_address : 'deesa',
      current_address: 'vadnagar',
      users:{
        firstName:'pal',
        lastName:'ray'
      }
     }],{
    include:[db.contactUser]
   })


   var data = await Users.findAll({
    include:{
      model:Contacts
    }
   })
  res.status(200).json({data:data})

}

var mnAssociationUser = async(req,res)=>{
  //CREATE DIFFERENT QUERY  FOR INDIVIDUAL TABLE----------
  // const amidala = await Customers.create({ username: 'p4dm3', points: 1000 });
  // const queen = await Profile.create({ name: 'Queen' });
  // await amidala.addProfile(queen, { through: { selfGranted: true } });
  // const result = await  Customers.findOne({
  //   where: { username: 'p4dm3' },
  //   include: Profile
  // });
  // console.log(result);

  //ENTRY USING SINGLE CREATE QUERY---------------------

  // const amidala = await Customers.create({
  //   username: 'p4dm3',
  //   points: 1000,
  //   profiles: [{
  //     name: 'Queen',
  //     User_Profile: {
  //       selfGranted: true
  //     }
  //   }]
  // }, {
  //   include: Profile
  // });
  
  // const result = await Customers.findOne({
  //   where: { username: 'p4dm3' },
  //   include: Profile
  // });
 
  res.status(200).json({data:result})
}

var m2m2mUser = async(req,res)=>{

  await Player.bulkCreate([
    { username: 's0me0ne' },
    { username: 'empty' },
    { username: 'greenhead' },
    { username: 'not_spock' },
    { username: 'bowl_of_petunias' }
  ]);
  await Game.bulkCreate([
    { name: 'The Big Clash' },
    { name: 'Winter Showdown' },
    { name: 'Summer Beatdown' }
  ]);
  await Team.bulkCreate([
    { name: 'The Martians' },
    { name: 'The Earthlings' },
    { name: 'The Plutonians' }
  ]);
  await GameTeam.bulkCreate([
    { GameId: 1, TeamId: 1 },   // this GameTeam will get id 1
    { GameId: 1, TeamId: 2 },   // this GameTeam will get id 2
    { GameId: 2, TeamId: 1 },   // this GameTeam will get id 3
    { GameId: 2, TeamId: 3 },   // this GameTeam will get id 4
    { GameId: 3, TeamId: 2 },   // this GameTeam will get id 5
    { GameId: 3, TeamId: 3 }    // this GameTeam will get id 6
  ]);
  await PlayerGameTeam.bulkCreate([
    // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
    { PlayerId: 1, GameTeamId: 3 },   // s0me0ne played for The Martians
    { PlayerId: 3, GameTeamId: 3 },   // greenhead played for The Martians
    { PlayerId: 4, GameTeamId: 4 },   // not_spock played for The Plutonians
    { PlayerId: 5, GameTeamId: 4 }    // bowl_of_petunias played for The Plutonians
  ]);

  const data = await Game.findOne({
    where: {
      name: "Winter Showdown"
    },
    include: {
      model: GameTeam,
      include: [
        {
          model: Player,
          through: { attributes: [] } // Hide unwanted `PlayerGameTeam` nested object from results
        },
        Team
      ]
    }
  });

  res.status(200).json({data:data})

}
var hooks = async (req,res)=>{
  let data = await Users.create({firstName:'demo hooks1',lastName:'last hooks1',email:'hooks1@gmail.com'});
  res.status(200).json({data:data})

}

var transactions = async (req,res)=>{
  const t = await sequelize.transaction();
  // try{
  //   const user = await Users.create({firstName:'transaction',lastName:'concept',email:'example@gmail.com'},{

  //     transaction:t
  //   });
  //   console.log('commit');
  //   t.commit();
  // }
  // catch(e){
  //   console.log('rollback');
  //   t.rollback();
  // }
  let data = await Users.findAll({
    transaction:t
  })
  res.status(200).json({data:data})

}

module.exports={polymorphic,polymorphicMany,scopes,loadingUser,createUsers,mnAssociationUser,m2m2mUser,hooks,transactions}