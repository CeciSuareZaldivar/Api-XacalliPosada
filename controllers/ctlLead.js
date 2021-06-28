const db = require('../config/dbConexion.js');
const lead = db.Lead;
const Op = db.Sequelize.Op;


//################  NUEVO LEAD #################
//Servicio para crear un nuevo registro en la base.
//POST: http://localhost:3000/lead/
exports.newLead = (req, res,next) => {
	const Lea = lead.build(req.body);
	Lea.save().then(lea => {
		return res.status(201).json(lea)
	}).then(next).catch(error => {
		return res.json("El lead ya existe")
	});
};

//################  OBTIENE LEAD ###############
//Consulta de todos los registros.
// GET : http://localhost:3000/lead/
exports.getLeads = (req, res) => {
	lead.findAll().then(leaen => {
		res.json(leaen);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//################  OBTIENE LEAD ###############
//Consulta por id.
// GET : http://localhost:3000/lead/e001
exports.getLead = (req, res) => {	
	const id = req.params.id_lead;
	lead.findByPk(id).then(lead => {
		if(lead===null){
			return res.json("El id de lead no existe");
		}
		res.json(lead);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//##################################################
//################  ACTUALIZA LEAD #############
// PUT : http://localhost:3000/lead/e001
exports.updateLead = (req, res, next) => {
	const id = req.params.id_lead;
	lead.update({     id_lead         : req.body.id_lead, 
					  nombre          : req.body.nombre, 
					  apellido        : req.body.apellido, 
					  telefono        : req.body.telefono, 
					  num_personas    : req.body.num_personas, 
                      num_mascotas    : req.body.num_mascotas, 
                      fecha_registro  : req.body.fecha_registro,
                      fecha_check_in  : req.body.fecha_check_in,
                      fecha_check_out : req.body.fecha_check_out,
                      id_vendedor     : req.body.id_vendedor, 
                      estado          : req.body.estado,
                      id_ticket       : req.body.id_ticket, 
                      anticipo        : req.body.anticipo, 
                      id_campana      : req.body.id_campana, 
                      medio           : req.body.medio, 
                      anuncio         : req.body.anuncio, 
                      tipo_lead       : req.body.tipo_lead}, {
			where: { id_lead: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Lead actualizado satisfactoriamente."
			});
		} else {
			res.send({
				message: `No se puede actualizar el lead con Id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error al tratar de actualizar con Id=" + id
		});
	});
};

//################  ELIMINA LEAD ###############
//Servicio para eliminar un registro.
// DELETE : http://localhost:3000/lead/e0117
exports.deleteLead = (req, res) => {
	const id = req.params.id_lead;
	if(id === null){
		return res.json("Mando un campo nulo");
	}
	lead.findByPk(id).then(lead => {
		lead.destroy({
			where: { id_lead: id }
		}).then(() => {
			res.status(200).json('Se elimino satisfactoriamente el lead con Id ' + id);
		});
	}).catch(error => {
		return res.json("El lead no existe")
	})
};

//######### BUSCAR CON LIMIT ###############
// GET : http://localhost:3000/lead/limit/1
exports.getLeadsLimit = (req, res) => {
	const param = req.params.val;
	const valorparam = parseInt(param,10);
	if(valorparam === 0){
		return res.json("El valor ingresado no es valido");
	}else{
		lead.findAll({limit: valorparam}).then(lead => {
			res.json(lead);
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

	lead.findAll({ where:{
			[Op.or]: [
				{ id_lead:          { [Op.like]: `%${word}%` } },
				{ nombre:           { [Op.like]: `%${word}%` } },
				{ apellido:         { [Op.like]: `%${word}%` } },
				{ telefono:         { [Op.like]: `%${word}%` } },
				{ num_personas:     { [Op.like]: `%${word}%` } },
				{ num_mascotas:     { [Op.like]: `%${word}%` } },
				{ fecha_registro:   { [Op.like]: `%${word}%` } },
                { fecha_check_in:   { [Op.like]: `%${word}%` } },
				{ fecha_check_out:  { [Op.like]: `%${word}%` } },
				{ id_vendedor:      { [Op.like]: `%${word}%` } },
				{ estado:           { [Op.like]: `%${word}%` } },
				{ id_ticket:        { [Op.like]: `%${word}%` } },
				{ anticipo:         { [Op.like]: `%${word}%` } },
                { id_campana:       { [Op.like]: `%${word}%` } },
				{ medio:            { [Op.like]: `%${word}%` } },
				{ anuncio:          { [Op.like]: `%${word}%` } },
				{ tipo_lead:        { [Op.like]: `%${word}%` } }
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

	lead.findAll({ attributes: [...val] })
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
}
