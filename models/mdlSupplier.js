module.exports = (sequelize, DataTypes) => {
	const  Sequelize  = require('sequelize');
	
	const Supplier = sequelize.define('Supplier',{
	id_proveedor:{
		type: DataTypes.UUID,
  		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
      	unique: true,
		primaryKey : true
	},
    empresa:{
		type       : DataTypes.STRING,
		allowNull  : false
	},
    nombre:{
		type       : DataTypes.STRING,
		allowNull  : false
	},
    apellido       :DataTypes.STRING,
    telefono       :DataTypes.STRING,
    email          :DataTypes.STRING,
	productos_servicios:{
		type       : DataTypes.STRING,
		allowNull  : false
	},
    descripcion       :DataTypes.STRING,
    pag_web           :DataTypes.STRING,
    social_media      :DataTypes.STRING
},{tableName : 'proveedores',timestamps: false});
	return Supplier;
}
