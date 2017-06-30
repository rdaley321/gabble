'use strict';
module.exports = function(sequelize, DataTypes) {
  var gab = sequelize.define('gab', {
    postedby: DataTypes.STRING,
    msg: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    likedby: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return gab;
};