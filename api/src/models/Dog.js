const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_height:{
      type: DataTypes.STRING,
      allowNull: true
    },
    max_height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    min_weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    max_weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    min_life_span:{
      type: DataTypes.STRING,
      allowNull: true
    },
    max_life_span:{
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
