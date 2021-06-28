module.exports = function(app) {

    const supplier = require('../controllers/ctlSupplier.js');
    app.post  ('/supplier/',                supplier.newSupplier);
    app.get   ('/supplier/',                supplier.getSuppliers);
    app.get   ('/supplier/:id_proveedor',   supplier.getSupplier);
    app.put   ('/supplier/:id_proveedor',   supplier.updateSupplier);
    app.delete('/supplier/:id_proveedor',   supplier.deleteSupplier);
    app.get   ('/supplier/limit/:val',      supplier.getSuppliersLimit);
    app.get   ('/supplier/coincidence/:word',      supplier.findAMatch);
    app.get   ('/supplier/attributes/search/',     supplier.searchByAttribute);
}