module.exports = function (sequelize, DataTypes) {
  return sequelize.define('movie', {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    title: { type: DataTypes.STRING },
    path: { type: DataTypes.STRING },
    plot: { type: DataTypes.STRING },
    rank: { type: DataTypes.STRING },
    rated: { type: DataTypes.STRING },
    year: { type: DataTypes.STRING },
    poster: { type: DataTypes.STRING },

  })
}