module.exports = function(app) {

    const employee = require('../controllers/ctlEmployee.js');
    app.post  ('/employee/',               employee.newEmployee);
    app.get   ('/employee/',               employee.getEmployees);
    app.get   ('/employee/:id_empleado',   employee.getEmployee);
    app.put   ('/employee/:id_empleado',   employee.updateEmployee);
    app.delete('/employee/:id_empleado',   employee.deleteEmployee);
    app.get   ('/employee/limit/:val',     employee.getEmployeesLimit);
    app.get   ('/employee/coincidence/:word',      employee.findAMatch);
    app.get   ('/employee/attributes/search/',     employee.searchByAttribute);
}