const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tablas
db.Lead = require('../models/mdlLead.js')(sequelize, Sequelize);
db.Reservation = require('../models/mdlReservation.js')(sequelize, Sequelize);
db.Marketing = require('../models/mdlMarketing.js')(sequelize, Sequelize);
db.Client = require('../models/mdlClient.js')(sequelize, Sequelize);
db.Supplier = require('../models/mdlSupplier.js')(sequelize, Sequelize);
db.Service = require('../models/mdlService.js')(sequelize, Sequelize);
db.Room = require('../models/mdlRoom.js')(sequelize, Sequelize);
db.Employee = require('../models/mdlEmployee.js')(sequelize, Sequelize);

module.exports = db;

