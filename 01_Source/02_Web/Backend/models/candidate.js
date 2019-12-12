module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define('Candidate', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      face: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      votesIn:{
          type: DataTypes.INTEGER,
          defaultValue : 0  
      },
      votesOut:{
          type: DataTypes.INTEGER,
          defaultValue : 0  
      }
    })
    Candidate.associate = function(models) {
        Candidate.belongsTo(models.Event, {foreignKey: 'EventId', as: 'Event'})
    };
     

    return Candidate
  }
  