'use strict';
module.exports = function(sequelize, DataTypes) {
  var MovieCast = sequelize.define('MovieCast', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  //class method
  MovieCast.associate = function(models) {
    MovieCast.belongsTo(models.Movie);
    MovieCast.belongsTo(models.Cast);
  }

  return MovieCast;
};
