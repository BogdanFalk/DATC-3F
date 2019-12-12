module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    votesIn: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    votesOut: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

  })
  Party.associate = function (models) {
    Party.belongsTo(models.Event, { foreignKey: 'EventId', as: 'Event' })
  };


  return Party
}
