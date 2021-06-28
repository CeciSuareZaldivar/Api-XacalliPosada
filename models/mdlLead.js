module.exports = (sequelize, DataTypes) => {
	const  Sequelize  = require('sequelize');
	
	const Lead = sequelize.define('Lead',{
	id_lead:{
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
    apellido 	   : DataTypes.STRING,
    telefono       : DataTypes.STRING,
	num_personas:{
	    type       : DataTypes.INTEGER,
		allowNull  : false
	},
    num_mascotas:{
	    type       : DataTypes.INTEGER,
		allowNull  : false
	},
	fecha_registro:{
	    type       : DataTypes.DATE,
		allowNull  : false
	},
	fecha_check_in  : DataTypes.DATE,
    fecha_check_out : DataTypes.DATE,
	id_vendedor:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
	estado:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
	id_ticket:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
    anticipo       :  DataTypes.INTEGER,
	id_campana:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
	medio:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
	anuncio:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
    tipo_lead:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
},{tableName : 'leads',timestamps: false});
    return Lead;
}
