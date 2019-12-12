module.exports = (sequelize, DataTypes) => {
    const Referendum = sequelize.define('Referendum', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false
      },
      votes_yes : {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      votes_no : {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
  
    })
    Referendum.associate = function(models) {
        Referendum.belongsTo(models.Event, {foreignKey: 'EventId', as: 'Event'})
    };
     

    return Referendum
  }
  