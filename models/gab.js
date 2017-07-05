'use strict';
module.exports = function(sequelize, DataTypes) {
  var gab = sequelize.define('gab', {
    postedby: DataTypes.STRING,
    msg: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Please enter a message'
        },
        len: {
          args: [
            0, 140
          ],
          msg: 'You can only enter up to 140 characters.'
        }
      }
    },
    likes: DataTypes.INTEGER,
    likedby: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  // gab.associate = function(models) {
  //   gab.belongsTo(models.user, {
  //     as: 'user',
  //     foreignKey: 'postid'
  //   })
  // }
  return gab;
};
