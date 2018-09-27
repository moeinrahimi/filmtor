var Sequelize = require('sequelize');
var config = require('../Config')
var sequelize = new Sequelize(config.dbName, 'root', config.DBPass, {
  host: 'localhost',
  dialect: 'mysql',
  charset: 'utf8',
  collate: 'utf8_general_ci',
  timezone: 'Asia/Tehran',
  logging: config.logging

})


var db = {};



db.Movie = sequelize.import(__dirname + "/Movie")
db.Setting = sequelize.import(__dirname + "/Setting")


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db
