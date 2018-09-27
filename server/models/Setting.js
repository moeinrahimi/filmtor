module.exports = function(sequelize, DataTypes) {
  return sequelize.define('setting', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    key: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },
    
  })
}