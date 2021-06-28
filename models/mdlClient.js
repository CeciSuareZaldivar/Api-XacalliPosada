module.exports = (sequelize, DataTypes) => {
	const  Sequelize  = require('sequelize');
	
	const Client = sequelize.define('Client',{
	id_client:{
		type: DataTypes.UUID,
  		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
      	unique: true,
		primaryKey : true
	},
	id_lead:{
		type       : DataTypes.STRING,
		allowNull  : false
	},
	nombre:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
    apellido          :  DataTypes.STRING,
    telefono          :  DataTypes.STRING,
	email             :  DataTypes.STRING,
    nacionalidad      :  DataTypes.STRING,
    visitas:{
	    type       : DataTypes.STRING,
		allowNull  : false
	}
},{tableName : 'clientes',timestamps: false});
    return Client;
}
