const db = require('../config/dbConexion.js');
const supplier = db.Supplier;
const Op = db.Sequelize.Op;


//################  NUEVO PROVEEDOR #################
//Servicio para crear un nuevo registro en la base.
//POST: http://localhost:3000/supplier/
exports.newSupplier = (req, res,next) => {
	const Sup = supplier.build(req.body);
	Sup.save().then(sup => {
		return res.status(201).json(sup)
	}).then(next).catch(error => {
		return res.json("El proveedor ya existe")
	});
};

//################  OBTIENE PROVEEDOR ###############
//Consulta de todos los registros.
// GET : http://localhost:3000/supplier/
exports.getSuppliers = (req, res) => {
	supplier.findAll().then(supen => {
		res.json(supen);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//################  OBTIENE PROVEEDOR ###############
//Consulta por id.
// GET : http://localhost:3000/supplier/e001
exports.getSupplier = (req, res) => {	
	const id = req.params. id_proveedor;
	supplier.findByPk(id).then(supplier => {
		if(supplier===null){
			return res.json("El id de proveedor no existe");
		}
		res.json(supplier);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//##################################################
//################  ACTUALIZA PROVEEDOR #############
// PUT : http://localhost:3000/supplier/e001
exports.updateSupplier = (req, res, next) => {
	const id = req.params. id_proveedor;
	supplier.update({ id_proveedor        : req.body. id_proveedor, 
                      empresa             : req.body.empresa, 
					  nombre              : req.body.nombre, 
					  apellido            : req.body.apellido, 
					  telefono            : req.body.telefono, 
                      email               : req.body.email, 
					  productos_servicios : req.body.productos_servicios, 
                      descripcion         : req.body.descripcion, 
                      pag_web             : req.body.pag_web, 
                      social_media        : req.body.social_media}, {
			where: {  id_proveedor: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Proveedor actualizado satisfactoriamente."
			});
		} else {
			res.send({
				message: `No se puede actualizar el proveedor con Id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error al tratar de actualizar con Id=" + id
		});
	});
};

//################  ELIMINA PROVEEDOR ###############
//Servicio para eliminar un registro.
// DELETE : http://localhost:3000/supplier/e0117
exports.deleteSupplier = (req, res) => {
	const id = req.params. id_proveedor;
	if(id === null){
		return res.json("Mando un campo nulo");
	}
	supplier.findByPk(id).then(supplier => {
		supplier.destroy({
			where: {  id_proveedor: id }
		}).then(() => {
			res.status(200).json('Se elimino satisfactoriamente el proveedor con Id ' + id);
		});
	}).catch(error => {
		return res.json("El proveedor no existe")
	})
};

//######### BUSCAR CON LIMIT ###############
// GET : http://localhost:3000/supplier/limit/1
exports.getSuppliersLimit = (req, res) => {
	const param = req.params.val;
	const valorparam = parseInt(param,10);
	if(valorparam === 0){
		return res.json("El valor ingresado no es valido");
	}else{
		supplier.findAll({limit: valorparam}).then(supplier => {
			res.json(supplier);
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

	supplier.findAll({ where:{
			[Op.or]: [
				{ id_proveedor:           { [Op.like]: `%${word}%` } },
				{ empresa:                { [Op.like]: `%${word}%` } },
				{ nombre:                 { [Op.like]: `%${word}%` } },
				{ apellido:               { [Op.like]: `%${word}%` } },
				{ telefono:               { [Op.like]: `%${word}%` } },
                { email:                  { [Op.like]: `%${word}%` } },
                { productos_servicios:    { [Op.like]: `%${word}%` } },
				{ descripcion:            { [Op.like]: `%${word}%` } },
				{ pag_web:                { [Op.like]: `%${word}%` } },
				{ social_media:           { [Op.like]: `%${word}%` } }
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

	supplier.findAll({ attributes: [...val] })
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
}
