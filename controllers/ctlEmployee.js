const db = require('../config/dbConexion.js');
const employee = db.Employee;
const Op = db.Sequelize.Op;


//################  NUEVO EMPLEADO #################
//Servicio para crear un nuevo registro en la base.
//POST: http://localhost:3000/employee/
exports.newEmployee = (req, res,next) => {
	const Emp = employee.build(req.body);
	Emp.save().then(emp => {
		return res.status(201).json(emp)
	}).then(next).catch(error => {
		return res.json("El empleado ya existe")
	});
};

//################  OBTIENE EMPLEADO ###############
//Consulta de todos los registros.
// GET : http://localhost:3000/employee/
exports.getEmployees = (req, res) => {
	employee.findAll().then(empen => {
		res.json(empen);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//################  OBTIENE EMPLEADO ###############
//Consulta por id.
// GET : http://localhost:3000/employee/e001
exports.getEmployee = (req, res) => {	
	const id = req.params.id_empleado;
	employee.findByPk(id).then(employee => {
		if(employee===null){
			return res.json("El id de empleado no existe");
		}
		res.json(employee);
	}).catch(error => {
		return res.sendStatus(401)
	})
};

//##################################################
//################  ACTUALIZA EMPLEADO #############
// PUT : http://localhost:3000/employee/e001
exports.updateEmployee = (req, res, next) => {
	const id = req.params.id_empleado;
	employee.update({ id_empleado  : req.body.id_empleado, 
					  nombre       : req.body.nombre, 
					  apellido     : req.body.apellido, 
					  telefono     : req.body.telefono, 
					  email        : req.body.email, 
                      rol          : req.body.rol, 
                      estado       : req.body.estado, 
                      nota         : req.body.nota, 
                      sueldo       : req.body.sueldo}, {
			where: { id_empleado: id }
	}).then(num => {
		if (num == 1) {
			res.send({
				message: "Empleado actualizado satisfactoriamente."
			});
		} else {
			res.send({
				message: `No se puede actualizar el empleado con Id=${id}.`
			});
		}
	}).catch(err => {
		res.status(500).send({
			message: "Error al tratar de actualizar con Id=" + id
		});
	});
};

//################  ELIMINA EMPLEADO ###############
//Servicio para eliminar un registro.
// DELETE : http://localhost:3000/employee/e0117
exports.deleteEmployee = (req, res) => {
	const id = req.params.id_empleado;
	if(id === null){
		return res.json("Mando un campo nulo");
	}
	employee.findByPk(id).then(employee => {
		employee.destroy({
			where: { id_empleado: id }
		}).then(() => {
			res.status(200).json('Se elimino satisfactoriamente el empleado con Id ' + id);
		});
	}).catch(error => {
		return res.json("El empleado no existe")
	})
};

//######### BUSCAR CON LIMIT ###############
// GET : http://localhost:3000/employee/limit/1
exports.getEmployeesLimit = (req, res) => {
	const param = req.params.val;
	const valorparam = parseInt(param,10);
	if(valorparam === 0){
		return res.json("El valor ingresado no es valido");
	}else{
		employee.findAll({limit: valorparam}).then(employee => {
			res.json(employee);
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

	employee.findAll({ where:{
			[Op.or]: [
				{ id_empleado: { [Op.like]: `%${word}%` } },
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

	employee.findAll({ attributes: [...val] })
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json("No hay datos para mostrar.")
	});
}
