module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cnp : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
  