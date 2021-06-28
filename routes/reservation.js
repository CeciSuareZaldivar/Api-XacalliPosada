module.exports = function(app) {

    const reservation = require('../controllers/ctlReservation.js');
    app.post  ('/reservation/',                    reservation.newReservation);
    app.get   ('/reservation/',                    reservation.getReservations);
    app.get   ('/reservation/:id_reservacion',     reservation.getReservation);
    app.put   ('/reservation/:id_reservacion',     reservation.updateReservation);
    app.delete('/reservation/:id_reservacion',     reservation.deleteReservation);
    app.get   ('/reservation/limit/:val',          reservation.getReservationsLimit);
    app.get   ('/reservation/coincidence/:word',   reservation.findAMatch);
    app.get   ('/reservation/attributes/search/',  reservation.searchByAttribute);
}