module.exports = function(app) {

    const client = require('../controllers/ctlClient.js');
    app.post  ('/client/',               client.newClient);
    app.get   ('/client/',               client.getClients);
    app.get   ('/client/:id_cliente',    client.getClient);
    app.put   ('/client/:id_cliente',    client.updateClient);
    app.delete('/client/:id_cliente',    client.deleteClient);
    app.get   ('/client/limit/:val',     client.getClientsLimit);
    app.get   ('/client/coincidence/:word',      client.findAMatch);
    app.get   ('/client/attributes/search/',     client.searchByAttribute);
}