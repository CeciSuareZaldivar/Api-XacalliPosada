module.exports = (sequelize, DataTypes) => {
	const  Sequelize  = require('sequelize');
	
	const Reservation = sequelize.define('Reservation',{
	id_reservacion:{
		type: DataTypes.UUID,
  		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
      	unique: true,
		primaryKey : true
	},
    id_seguimiento : DataTypes.STRING,
    id_cabana      : DataTypes.STRING,
    id_servicio    : DataTypes.STRING,
	num_personas:{
	    type       : DataTypes.INTEGER,
		allowNull  : false
	},
    num_mascotas:{
	    type       : DataTypes.INTEGER,
		allowNull  : false
	},
    fecha_check_in:{
	    type       : DataTypes.DATE,
		allowNull  : false
	},
    hora_check_in:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
    fecha_check_out:{
	    type       : DataTypes.DATE,
		allowNull  : false
	},
    hora_check_out:{
	    type       : DataTypes.STRING,
		allowNull  : false
	},
    ticket         :  DataTypes.STRING,
    fecha_anticipo:{
	    type       : DataTypes.DATE,
		allowNull  : false
	},
    anticipo:{
	    type       : DataTypes.INTEGER,
		allowNull  : false
	},
	restante       :  DataTypes.INTEGER,
    comentarios    :  DataTypes.STRING
},{tableName : 'reservaciones',timestamps: false});
    return Reservation;
}
