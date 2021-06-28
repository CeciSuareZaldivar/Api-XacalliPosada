const db = require('../config/dbConexion.js');
const marketing = db.Marketing;
const Op = db.Sequelize.Op;


//################  NUEVO MARKETING #################
//Servicio para crear un nuevo registro en la base.
//POST: http://localhost:3000/marketing/
exports.newMarketing = (req, res,next) => {
	const Mkt = marketing.build(req.body);
	Mkt.save().then(mkt => {
		return res.status(201).json(mkt)
	}).then(next).catch(error => {
		return res.json("La campaña de marketing ya existe")
	});
};

//################  OBTIENE MARKETING ###############
//Consulta de todos los registros.
// GET : http://localhost:3000/marketing/
exports.getMarketings = (req, res) => {
	marketing.findAll().then(mkten => {
		res.json(mkten);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//################  OBTIENE MARKETING ###############
//Consulta por id.
// GET : http://localhost:3000/marketing/e001
exports.getMarketing = (req, res) => {	
	const id = req.params.id_marketing;
	marketing.findByPk(id).then(marketing => {
		if(marketing===null){
			return res.json("El id de la campaña marketing no existe");
		}
		res.json(marketing);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//##################################################
//################  ACTUALIZA MARKETING #############
// PUT : http://localhost:3000/marketing/e001
exports.updateMarketing = (req, res, next) => {
	const id = req.params.id_marketing;
	marketing.update({id_marketing    : req.body.id_marketing, 
                      campana         : req.body.campana,
					  medio           : req.body.medio,
                      anuncio         : req.body.anuncio,
                      lead_organico   : req.body.lead_organico,
                      lead_pagado     : req.body.lead_pagado,
                      total_leads     : req.body.total_leads,
                      conversion      : req.body.conversion,
                      presupuesto     : req.body.presupuesto,
                      fecha_inicio    : req.body.fecha_inicio,
                      fecha_fin       : req.body.fecha_fin}, {
			where: { id_marketing: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "La campaña de marketing se ha actualizado satisfactoriamente."
			});
		} else {
			res.send({
				message: `No se puede actualizar la campaña de marketing con Id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error al tratar de actualizar con Id=" + id
		});
	});
};

//################  ELIMINA MARKETING ###############
//Servicio para eliminar un registro.
// DELETE : http://localhost:3000/marketing/e0117
exports.deleteMarketing = (req, res) => {
	const id = req.params.id_marketing;
	if(id === null){
		return res.json("Mando un campo nulo");
	}
	marketing.findByPk(id).then(marketing => {
		marketing.destroy({
			where: { id_marketing: id }
		}).then(() => {
			res.status(200).json('Se elimino satisfactoriamente la campaña de marketing con Id ' + id);
		});
	}).catch(error => {
		return res.json("La campaña de marketing no existe")
	})
};

//######### BUSCAR CON LIMIT ###############
// GET : http://localhost:3000/marketing/limit/1
exports.getMarketingsLimit = (req, res) => {
	const param = req.params.val;
	const valorparam = parseInt(param,10);
	if(valorparam === 0){
		return res.json("El valor ingresado no es valido");
	}else{
		marketing.findAll({limit: valorparam}).then(marketing => {
			res.json(marketing);
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

	marketing.findAll({ where:{
			[Op.or]: [
				{ id_marketing:     { [Op.like]: `%${word}%` } },
				{ campana:          { [Op.like]: `%${word}%` } },
				{ medio:            { [Op.like]: `%${word}%` } },
				{ anuncio:          { [Op.like]: `%${word}%` } },
				{ lead_organico:    { [Op.like]: `%${word}%` } },
				{ lead_pagado:      { [Op.like]: `%${word}%` } },
				{ total_leads:      { [Op.like]: `%${word}%` } },
                { conversion:       { [Op.like]: `%${word}%` } },
				{ presupuesto:      { [Op.like]: `%${word}%` } },
				{ fecha_inicio:     { [Op.like]: `%${word}%` } },
				{ fecha_fin:        { [Op.like]: `%${word}%` } }
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

	marketing.findAll({ attributes: [...val] })
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
}
