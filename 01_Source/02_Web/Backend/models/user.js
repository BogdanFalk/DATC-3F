module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
      },
      voted_events: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
    // User.associate = function (models) {
    //   User.belongsToMany(models.Post, {
    //     through: models.UserPost,
    //     as: 'posts',
    //     foreignKey: 'userId'
    //   });
    // //   Candidate.belongsToMany(models.Company, {
    // //     through: models.CandidateCompany,
    // //     as: 'companies',
    // //     foreignKey: 'candidateId'
    // //   });
    // };
    return User
  }
  