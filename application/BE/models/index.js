const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize( // node와 mysql을 연결(sequelize는 내부적으로 mysql2를 사용)
  config.database,
  config.username,
  config.password,
  config
);

db.Comment = require("./comment")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.Item = require("./item")(sequelize, Sequelize);
db.ItemInfo = require("./itemInfo")(sequelize, Sequelize);
db.Mempool = require("./mempool")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  // 위에서 각각 정의한 model의 관계를 설정
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
