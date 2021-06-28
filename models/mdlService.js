module.exports = (sequelize, DataTypes) => {
	const  Sequelize  = require('sequelize');
	
	const Service = sequelize.define('Service',{
	id_servicio:{
		type: DataTypes.UUID,
  		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
      	unique: true,
		primaryKey : true
	},
	nombre:{
		type       : DataTypes.STRING,
		allowNull  : false
	},
    descripcion       :DataTypes.STRING,
    duracion          :DataTypes.STRING,
    precio            :DataTypes.INTEGER
},{tableName : 'servicios',timestamps: false});
	return Service;
}
