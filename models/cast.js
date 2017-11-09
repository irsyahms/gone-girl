'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cast = sequelize.define('Cast', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING,
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
  Cast.associate = function(models) {
    Cast.belongsToMany(models.Movie, {through: 'MovieCast'});
    Cast.hasMany(models.MovieCast);
  }

  //instance method
  Cast.prototype.getFullname = function () {
    return `${this.first_name} ${this.last_name}`;
  }

  return Cast;
};
