'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [
            3, 10
          ],
          msg: 'Your username must be between 3-10 characters!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [
            3, 10
          ],
          msg: 'Your password must be between 3-10 characters!'
        }
      }
    }
  }, {});
  // user.associate = function(models) {
  //   user.hasMany(models.gab, {
  //     as: 'gabs',
  //     foreignKey: 'postid'
  //   })
  // }

  return user;
};
