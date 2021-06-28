module.exports = function(app) {

    const service = require('../controllers/ctlService.js');
    app.post  ('/service/',               service.newService);
    app.get   ('/service/',               service.getServices);
    app.get   ('/service/:id_servicio',   service.getService);
    app.put   ('/service/:id_servicio',   service.updateService);
    app.delete('/service/:id_servicio',   service.deleteService);
    app.get   ('/service/limit/:val',     service.getServicesLimit);
    app.get   ('/service/coincidence/:word',      service.findAMatch);
    app.get   ('/service/attributes/search/',     service.searchByAttribute);
}