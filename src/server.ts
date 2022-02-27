import Express from "express";
import { Sequelize } from "sequelize";

require("dotenv").config();
const app = Express();
const port = process.env.PORT || 8000;

var sequelize = new Sequelize("napoleon", "napoleon", "password", {
  dialect: "mariadb",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
app.use("/", (req, res) => {
  res.status(200);
  res.send("asdsdfsdf");
  res.end();
});
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
