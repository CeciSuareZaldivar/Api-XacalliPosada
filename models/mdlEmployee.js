module.exports = (sequelize, DataTypes) => {
	const  Sequelize  = require('sequelize');

	const Employee = sequelize.define('Employee',{
	id_empleado:{
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
	apellido       :  DataTypes.STRING,
	telefono:{
		type       :DataTypes.STRING,
		allowNull  : false
	},
	email          :  DataTypes.STRING,
	rol:{  
		type       :  DataTypes.STRING,
		allowNull  : false
	},
	estado:{  
		type       :  DataTypes.STRING,
		allowNull  : false
	},
	nota           :  DataTypes.STRING,
	sueldo:{  
		type       :  DataTypes.INTEGER,
		allowNull  : false
	}
},{tableName : 'empleados',timestamps: false});
return Employee;
}
