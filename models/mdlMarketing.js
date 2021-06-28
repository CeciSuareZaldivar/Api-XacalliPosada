module.exports = (sequelize, DataTypes) => {
	const  Sequelize  = require('sequelize');
	
	const Marketing = sequelize.define('Marketing',{
	id_marketing:{
		type: DataTypes.UUID,
  		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
      	unique: true,
		primaryKey : true
	},
    campana          :DataTypes.STRING,
    medio            :DataTypes.STRING,
    anuncio          :DataTypes.STRING,
    lead_organico    :DataTypes.INTEGER,
    lead_pagado      :DataTypes.INTEGER,
    total_leads      :DataTypes.INTEGER,
    conversion       :DataTypes.INTEGER,
    presupuesto      :DataTypes.INTEGER,
    fecha_inicio     :DataTypes.DATE,
    fecha_fin        :DataTypes.DATE
},{tableName : 'marketing',timestamps: false});
	return Marketing;
}
