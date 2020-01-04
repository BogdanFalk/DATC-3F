module.exports = (sequelize, DataTypes) => {
    const bannedUser = sequelize.define('bannedUser', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cnp : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    })
    return bannedUser
  }
  