import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";

require("dotenv").config();

createConnection()
  .then(() => {
    const app = express();
    const port = process.env.PORT || 8000;
    const Router = require('./routes').default
    app.use(Router)
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
