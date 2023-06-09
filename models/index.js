'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize,DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.sequelize.sync({force:false});

db.employees = require('./employees')(sequelize,DataTypes)
// db.users.hasOne(db.contact,{foreignKey: 'user_id'});
// db.contact.belongsTo(db.users);

// db.users.hasMany(db.contact,{foreignKey: 'user_id'});
// db.contact.belongsTo(db.users,{foreignKey:'user_id'});

// db.users.hasMany(db.contact,{foreignKey: 'user_id'});
// db.contactUser = db.contact.belongsTo(db.users,{foreignKey:'user_id',as:'users'})


// db.users.belongsToMany(db.contact, { through: 'user_contacts' });
// db.contact.belongsToMany(db.users, { through: 'user_contacts' });

//polymorphic one-to-many
db.image.hasMany(db.comments,{
  foreignKey:'commentableId',
  constraints:false,
  scope:{
    commentableType:'image'
  }
});
db.videos.hasMany(db.comments,{
  foreignKey:'commentableId',
  constraints:false,
  scope:{
    commentableType:'video'
  }
});

db.comments.belongsTo(db.image,{
  foreignKey:'commentableId',constraints:false
});
db.comments.belongsTo(db.videos,{foreignKey:'commentableId',constraints:false});

//Polymorphic many-to-many

//image  to tags

db.image.belongsToMany(db.tags,{
  through:{
  model: db.tag_taggable,
  scope:{
    taggableType: 'image'
  }
},
foreignKey:'taggableId',
constraints:false
});

//tag to image

db.tags.belongsToMany(db.image,{
  through:{
    model:db.tag_taggable,
    unique:false,
    scope:{
      taggableType:'image'
    }
  },
  foreignKey:'tagId',
  constraints:false
})

//video to tag
db.videos.belongsToMany(db.tags,{through:{
  model: db.tag_taggable,
  unique:false,
  scope:{
    taggableType: 'video'
  }
},
foreignKey:'taggableId',
constraints:false
});

//tag to video
 
db.tags.belongsToMany(db.videos,{
  through:{
    model:db.tag_taggable,
    unique:false,
    scope:{
      taggableType:'video'
    }
  },
  foreignKey:'tagId',
  constraints:false
})

//--------scopes--------

db.users.addScope('checkdata',{
  where:{
    lastName: 'patel'
  }
})

//m:n associations
db.customers.belongsToMany(db.profile,{through:'User_Profiles'});
db.profile.belongsToMany(db.customers,{through: 'User_Profiles'});

//m2m2m associations

//team-game (table:gameTeam)
db.Team.belongsToMany(db.Team,{as:'Team',foreignKey:'TeamId',through:db.gameTeam});
db.Game.belongsToMany(db.Team,{as:'Game',foreignKey:'GameId',through:db.gameTeam});
db.gameTeam.belongsTo(db.Game);
db.gameTeam.belongsTo(db.Team);
db.Team.hasMany(db.gameTeam);
db.Game.hasMany(db.gameTeam);

//player-gameTeam (table:playergameTeam)
db.Player.belongsToMany(db.gameTeam,{through:db.playerGameTeam});
db.gameTeam.belongsToMany(db.Player,{through:db.playerGameTeam});
db.playerGameTeam.belongsTo(db.Player);
db.playerGameTeam.belongsTo(db.gameTeam);
db.Player.hasMany(db.playerGameTeam);
db.gameTeam.hasMany(db.playerGameTeam);

// console.log(db);
module.exports = db;
