module.exports = (sequelize, DataTypes) => {
	const  Sequelize  = require('sequelize');
	
	const Room = sequelize.define('Room',{
	id_cabana:{
		type: DataTypes.UUID,
  		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
      	unique: true,
		primaryKey : true
	},
    cupo:{
	    type       : DataTypes.INTEGER,
		allowNull  : false
	},
	precio:{
		type       : DataTypes.INTEGER,
		allowNull  : false
	},
},{tableName : 'cabanas',timestamps: false});
	return Room;
}
