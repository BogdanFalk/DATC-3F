module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date : {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
   )
    Event.associate = function (models)
    {
      Event.hasMany(models.Candidate,{as:"candidate"},{onDelete: 'cascade'}, {hooks: true})
      Event.hasMany(models.Party,{as:"party"},{onDelete: 'CASCADE'}, {hooks: true})
      Event.hasMany(models.Referendum,{as:"referendum"},{onDelete: 'CASCADE'}, {hooks: true})
    }
    // User.associate = function (models) {
    //   User.belongsToMany(models.Post, {
    //     through: models.UserPost,
    //     as: 'posts',
    //     foreignKey: 'userId'
    //   });
    //     Candidate.belongsToMany(models.Company, {
    //         through: models.CandidateCompany,
    //         as: 'companies',
    //         foreignKey: 'candidateId'
    //     });
    // };
    return Event
  }
  