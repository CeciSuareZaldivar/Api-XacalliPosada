module.exports = function(app) {

    const lead = require('../controllers/ctlLead.js');
    app.post  ('/lead/',           lead.newLead);
    app.get   ('/lead/',           lead.getLeads);
    app.get   ('/lead/:id_lead',   lead.getLead);
    app.put   ('/lead/:id_lead',   lead.updateLead);
    app.delete('/lead/:id_lead',   lead.deleteLead);
    app.get   ('/lead/limit/:val', lead.getLeadsLimit);
    app.get   ('/lead/coincidence/:word',      lead.findAMatch);
    app.get   ('/lead/attributes/search/',     lead.searchByAttribute);
}