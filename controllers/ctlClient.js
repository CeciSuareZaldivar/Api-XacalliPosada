const db = require('../config/dbConexion.js');
const client = db.Client;
const Op = db.Sequelize.Op;


//################  NUEVO CLIENTE #################
//Servicio para crear un nuevo registro en la base.
//POST: http://localhost:3000/client/
exports.newClient = (req, res,next) => {
	const Cli = client.build(req.body);
	Cli.save().then(cli => {
		return res.status(201).json(cli)
	}).then(next).catch(error => {
		return res.json("El cliente ya existe")
	});
};

//################  OBTIENE CLIENTE ###############
//Consulta de todos los registros.
// GET : http://localhost:3000/client/
exports.getClients = (req, res) => {
	client.findAll().then(clien => {
		res.json(clien);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//################  OBTIENE CLIENTE ###############
//Consulta por id.
// GET : http://localhost:3000/client/e001
exports.getClient = (req, res) => {	
	const id = req.params.id_cliente;
	client.findByPk(id).then(client => {
		if(client===null){
			return res.json("El id de cliente no existe");
		}
		res.json(client);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//##################################################
//################  ACTUALIZA CLIENTE #############
// PUT : http://localhost:3000/client/e001
exports.updateClient = (req, res, next) => {
	const id = req.params.id_cliente;
	client.update({   id_cliente   : req.body.id_cliente, 
					  id_lead      : req.body.id_lead, 
					  nombre       : req.body.nombre, 
					  apellido     : req.body.apellido, 
					  telefono     : req.body.telefono, 
					  email        : req.body.email, 
					  nacionalidad : req.body.nacionalidad, 
					  visitas      : req.body.visitas }, {
			where: { id_cliente: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Cliente actualizado satisfactoriamente."
			});
		} else {
			res.send({
				message: `No se puede actualizar el cliente con Id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error al tratar de actualizar con id=" + id
		});
	});
};

//################  ELIMINA CLIENTE ###############
//Servicio para eliminar un registro.
// DELETE : http://localhost:3000/client/e0117
exports.deleteClient = (req, res) => {
	const id = req.params.id_cliente;
	if(id === null){
		return res.json("Mando un campo nulo");
	}
	client.findByPk(id).then(client => {
		client.destroy({
			where: { id_cliente: id }
		}).then(() => {
			res.status(200).json('Se elimino satisfactoriamente el cliente con Id ' + id);
		});
	}).catch(error => {
		return res.json("El cliente no existe")
	})
};

//######### BUSCAR CON LIMIT ###############
// GET : http://localhost:3000/client/limit/1
exports.getClientsLimit = (req, res) => {
	const param = req.params.val;
	const valorparam = parseInt(param,10);
	if(valorparam === 0){
		return res.json("El valor ingresado no es valido");
	}else{
		client.findAll({limit: valorparam}).then(client => {
			res.json(client);
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

	client.findAll({ where:{
			[Op.or]: [
				{ id_cliente:  { [Op.like]: `%${word}%` } },
				{ id_lead:     { [Op.like]: `%${word}%` } },
				{ nombre:      { [Op.like]: `%${word}%` } },
				{ apellido:    { [Op.like]: `%${word}%` } },
				{ telefono:    { [Op.like]: `%${word}%` } },
				{ email:       { [Op.like]: `%${word}%` } },
				{ nacionalidad:{ [Op.like]: `%${word}%` } },
				{ visitas:     { [Op.like]: `%${word}%` } }
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

	client.findAll({ attributes: [...val] })
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
}
