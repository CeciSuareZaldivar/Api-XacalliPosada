const db = require('../config/dbConexion.js');
const service = db.Service;
const Op = db.Sequelize.Op;


//################  NUEVO SERVICIO #################
//Servicio para crear un nuevo registro en la base.
//POST: http://localhost:3000/service/
exports.newService = (req, res,next) => {
	const Srv = service.build(req.body);
	Srv.save().then(srv => {
		return res.status(201).json(srv)
	}).then(next).catch(error => {
		return res.json("El servicio ya existe")
	});
};

//################  OBTIENE SERVICIO ###############
//Consulta de todos los registros.
// GET : http://localhost:3000/service/
exports.getServices = (req, res) => {
	service.findAll().then(srven => {
		res.json(srven);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//################  OBTIENE SERVICIO ###############
//Consulta por id.
// GET : http://localhost:3000/service/e001
exports.getService = (req, res) => {	
	const id = req.params.id_servicio;
	service.findByPk(id).then(service => {
		if(service===null){
			return res.json("El id de servicio no existe");
		}
		res.json(service);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//##################################################
//################  ACTUALIZA SERVICIO #############
// PUT : http://localhost:3000/service/e001
exports.updateService = (req, res, next) => {
	const id = req.params.id_servicio;
	service.update({ id_servicio   : req.body.id_servicio, 
					  nombre       : req.body.nombre, 
                      descripcion  : req.body.descripcion, 
                      duracion     : req.body.duracion, 
                      precio       : req.body.precio}, {
			where: { id_servicio: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Servicio actualizado satisfactoriamente."
			});
		} else {
			res.send({
				message: `No se puede actualizar el servicio con Id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error al tratar de actualizar con Id=" + id
		});
	});
};

//################  ELIMINA SERVICIO ###############
//Servicio para eliminar un registro.
// DELETE : http://localhost:3000/service/e0117
exports.deleteService = (req, res) => {
	const id = req.params.id_servicio;
	if(id === null){
		return res.json("Mando un campo nulo");
	}
	service.findByPk(id).then(service => {
		service.destroy({
			where: { id_servicio: id }
		}).then(() => {
			res.status(200).json('Se elimino satisfactoriamente el servicio con Id ' + id);
		});
	}).catch(error => {
		return res.json("El servicio no existe")
	})
};

//######### BUSCAR CON LIMIT ###############
// GET : http://localhost:3000/service/limit/1
exports.getServicesLimit = (req, res) => {
	const param = req.params.val;
	const valorparam = parseInt(param,10);
	if(valorparam === 0){
		return res.json("El valor ingresado no es valido");
	}else{
		service.findAll({limit: valorparam}).then(service => {
			res.json(service);
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

	service.findAll({ where:{
			[Op.or]: [
				{ id_servicio: { [Op.like]: `%${word}%` } },
				{ nombre:     { [Op.like]: `%${word}%` } },
				{ descripcion:      { [Op.like]: `%${word}%` } },
				{ duracion:    { [Op.like]: `%${word}%` } },
				{ precio:    { [Op.like]: `%${word}%` } }
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

	service.findAll({ attributes: [...val] })
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
}