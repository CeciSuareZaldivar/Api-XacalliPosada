module.exports = function(app) {

    const marketing = require('../controllers/ctlMarketing.js');
    app.post  ('/marketing/',                marketing.newMarketing);
    app.get   ('/marketing/',                marketing.getMarketings);
    app.get   ('/marketing/:id_marketing',   marketing.getMarketing);
    app.put   ('/marketing/:id_marketing',   marketing.updateMarketing);
    app.delete('/marketing/:id_marketing',   marketing.deleteMarketing);
    app.get   ('/marketing/limit/:val',      marketing.getMarketingsLimit);
    app.get   ('/marketing/coincidence/:word',      marketing.findAMatch);
    app.get   ('/marketing/attributes/search/',     marketing.searchByAttribute);
}