const db = require('../config/dbConexion.js');
const room = db.Room;
const Op = db.Sequelize.Op;

//################  NUEVA ROOM #################
//Servicio para crear un nuevo registro en la base.
//POST: http://localhost:3000/room/
exports.newRoom = (req, res,next) => {
	const Room = room.build(req.body);
	Room.save().then(dato => {
		return res.status(201).json(dato)
	}).then(next).catch(error => {
		return res.json("La habitación ya existe")
	});
};

//################  OBTIENE ROOM ###############
//Consulta de todos los registros.
// GET : http://localhost:3000/room/
exports.getRooms = (req, res) => {
	room.findAll().then(dato => {
		res.json(dato);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//################  OBTIENE ROOM ###############
//Consulta por id.
// GET : http://localhost:3000/room/e001
exports.getRoom = (req, res) => {	
	const id = req.params.id_cabana;
	room.findByPk(id).then(room => {
		if(room===null){
			return res.json("El id de la habitación no existe");
		}
		res.json(room);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//##################################################
//################  ACTUALIZA ROOM #############
// PUT : http://localhost:3000/room/e001
exports.updateRoom = (req, res, next) => {
	const id = req.params.id_cabana;
	room.update({     id_cabana     : req.body.id_cabana, 
					  cupo      	: req.body.cupo, 
					  precio      	: req.body.precio}, {
			where: { id_cabana: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Cabaña actualizada satisfactoriamente."
			});
		} else {
			res.send({
				message: `No se puede actualizar la cabaña con Id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error al tratar de actualizar con id=" + id
		});
	});
};

//################  ELIMINA ROOM ###############
//Servicio para eliminar un registro.
// DELETE : http://localhost:3000/room/e0117
exports.deleteRoom= (req, res) => {
	const id = req.params.id_cabana;
	if(id === null){
		return res.json("Mando un campo nulo");
	}
	room.findByPk(id).then(room => {
		room.destroy({
			where: { id_cabana: id }
		}).then(() => {
			res.status(200).json('Se elimino satisfactoriamente la cabaña con Id ' + id);
		});
	}).catch(error => {
		return res.json("La cabaña no existe")
	})
};

//######### BUSCAR CON LIMIT ###############
// GET : http://localhost:3000/room/limit/1
exports.getRoomsLimit = (req, res) => {
	const param = req.params.val;
	const valorparam = parseInt(param,10);
	if(valorparam === 0){
		return res.json("El valor ingresado no es valido");
	}else{
		room.findAll({limit: valorparam}).then(room => {
			res.json(room);
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

	room.findAll({ where:{
			[Op.or]: [    
				{ id_cabana:      { [Op.like]: `%${word}%` } },
				{ cupo:           { [Op.like]: `%${word}%` } },
				{ precio:         { [Op.like]: `%${word}%` } }
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

	room.findAll({ attributes: [...val] })
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
}
