const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activities', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        min:1,
        max:5
      },
    },
    duration: {
      type: DataTypes.INTEGER,

    },
    season: {
      type: DataTypes.ENUM('Summer', 'Fall', 'Winter' ,'Spring'),
    },
  });
};
