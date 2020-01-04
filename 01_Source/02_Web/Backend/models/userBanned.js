module.exports = (sequelize, DataTypes) => {
    const userBanned = sequelize.define('userBanned', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cnp : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    })
    userBanned.associate = function (models) {
      userBanned.belongsTo(models.User, { foreignKey: 'userId', as: 'User' })
    };
    return userBanned
  }
  