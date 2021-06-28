const db = require('../config/dbConexion.js');
const reservation = db.Reservation;
const Op = db.Sequelize.Op;


//################  NUEVA RESERVACION #################
//Servicio para crear un nuevo registro en la base.
//POST: http://localhost:3000/reservation/
exports.newReservation = (req, res,next) => {
	const Rts = reservation.build(req.body);
	Rts.save().then(rts => {
		return res.status(201).json(rts)
	}).then(next).catch(error => {
		return res.json("La reservación ya existe")
	});
};

//################  OBTIENE RESERVACION ###############
//Consulta de todos los registros.
// GET : http://localhost:3000/reservation/
exports.getReservations = (req, res) => {
	reservation.findAll().then(rtsen => {
		res.json(rtsen);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//################  OBTIENE RESERVACION ###############
//Consulta por id.
// GET : http://localhost:3000/reservation/e001
exports.getReservation = (req, res) => {	
	const id = req.params.id_reservacion;
	reservation.findByPk(id).then(reservation => {
		if(reservation===null){
			return res.json("El id de la reservación no existe");
		}
		res.json(reservation);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//##################################################
//################  ACTUALIZA RESERVACION #############
// PUT : http://localhost:3000/reservation/e001
exports.updateReservation = (req, res, next) => {
	const id = req.params.id_reservacion;
	reservation.update({id_reservacion  : req.body.id_reservacion, 
						id_seguimiento  : req.body.id_seguimiento,
						id_cabana  		: req.body.id_cabana, 
						id_servicio  	: req.body.id_servicio,
					  	num_personas    : req.body.num_personas, 
                      	num_mascotas    : req.body.num_mascotas, 
                      	fecha_check_in  : req.body.fecha_check_in,
						hora_check_in   : req.body.hora_check_in,
                      	fecha_check_out : req.body.fecha_check_out,
						hora_check_out  : req.body.hora_check_out,
                      	ticket       	: req.body.ticket,
                      	fecha_anticipo  : req.body.fecha_anticipo, 
                      	anticipo  		: req.body.anticipo,  
						restante  		: req.body.restante,
						comentarios  	: req.body.comentarios	}, {
			where: { id_reservacion: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Reservación actualizada satisfactoriamente."
			});
		} else {
			res.send({
				message: `No se puede actualizar la reservación con Id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error al tratar de actualizar con Id=" + id
		});
	});
};

//################  ELIMINA RESERVACION ###############
//Servicio para eliminar un registro.
// DELETE : http://localhost:3000/reservation/e0117
exports.deleteReservation = (req, res) => {
	const id = req.params.id_reservacion;
	if(id === null){
		return res.json("Mando un campo nulo");
	}
	reservation.findByPk(id).then(reservation => {
		reservation.destroy({
			where: { id_reservacion: id }
		}).then(() => {
			res.status(200).json('Se elimino satisfactoriamente la reservación con Id ' + id);
		});
	}).catch(error => {
		return res.json("La reservación no existe")
	})
};

//######### BUSCAR CON LIMIT ###############
// GET : http://localhost:3000/reservation/limit/1
exports.getReservationsLimit = (req, res) => {
	const param = req.params.val;
	const valorparam = parseInt(param,10);
	if(valorparam === 0){
		return res.json("El valor ingresado no es valido");
	}else{
		reservation.findAll({limit: valorparam}).then(reservation => {
			res.json(reservation);
		}).catch(error => {
			return res.sendStatus(401)
		})
	}
};

// Consulta por coincidencia de atributos, es decir, si los registros tienen un campo
// nombre, el servicio debe ser capaz de regresar todos los registros que compartan el
// nombre. Y esto debe funcionar en general para todos los campos de la base.
//--------------Falta hacer para los demas cmapos---------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
exports.findAMatch = (req, res) => {
	const word = req.params.word;

	reservation.findAll({ where:{
			[Op.or]: [
				{ id_reservacion:   { [Op.like]: `%${word}%` } },
				{ id_seguimiento:   { [Op.like]: `%${word}%` } },
				{ id_cabana:        { [Op.like]: `%${word}%` } },
				{ id_servicio:      { [Op.like]: `%${word}%` } },
				{ num_personas:     { [Op.like]: `%${word}%` } },
				{ num_mascotas:     { [Op.like]: `%${word}%` } },
				{ fecha_check_in:   { [Op.like]: `%${word}%` } },
                { hora_check_in:   	{ [Op.like]: `%${word}%` } },
				{ fecha_check_out:  { [Op.like]: `%${word}%` } },
				{ hora_check_out:   { [Op.like]: `%${word}%` } },
				{ ticket:           { [Op.like]: `%${word}%` } },
				{ fecha_anticipo:   { [Op.like]: `%${word}%` } },
				{ anticipo:         { [Op.like]: `%${word}%` } },
                { restante:       	{ [Op.like]: `%${word}%` } },
				{ comentarios:      { [Op.like]: `%${word}%` } }
			]
		}
	})
	.then(data => {
		if(data !== [])
			res.json(data);
		else
			res.json("No hay datos para mostrar.")
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
};

// Servicio de consulta por campos, es decir, un servicio que solo regrese los campos
// que se piden por el usuario.

exports.searchByAttribute = (req, res) => {
	const val = req.body.valores;
	console.log(val)

	reservation.findAll({ attributes: [...val] })
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
}
