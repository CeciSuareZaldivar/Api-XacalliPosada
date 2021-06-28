module.exports = function(app) {

    const room = require('../controllers/ctlRoom.js');
    app.post  ('/room/',              room.newRoom);
    app.get   ('/room/',              room.getRooms);
    app.get   ('/room/:id_cabana',    room.getRoom);
    app.put   ('/room/:id_cabana',    room.updateRoom);
    app.delete('/room/:id_cabana',    room.deleteRoom);
    app.get   ('/room/limit/:val',    room.getRoomsLimit);
    app.get   ('/room/coincidence/:word',      room.findAMatch);
    app.get   ('/room/attributes/search/',     room.searchByAttribute);
}