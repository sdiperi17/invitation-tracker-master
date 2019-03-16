const Sequelize = require("sequelize");
const dbName = "invitation_db";

const db = new Sequelize(
    process.env.DATABASE_URL || "postgres://localhost:3001/invitation_db",
    {
        database: dbName,
        dialect: "postgres",
        define: {
            underscored: true
        }
    }
);

// const db = new Sequelize(
//     process.env.DATABASE_URL || "postgres://localhost:5432/invitation_db",
//     {
//         dialect: "postgres"
//     }
// );

const Recipient = require("./Recipient")(db, Sequelize);
const Survey = require("./Survey")(db, Sequelize);
const User = require("./User")(db, Sequelize);

db.sync();

module.exports = {
    Recipient,
    Survey,
    User
};
