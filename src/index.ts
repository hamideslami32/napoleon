import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import xssClean from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import { ApiError } from './utils/apiError';
import httpStatus from 'http-status';

require('dotenv').config();

createConnection()
  .then(() => {
    const app = express();
    const port = process.env.PORT || 8000;
    const Router = require('./routes').default;
    const { authMiddleware } = require('./middlewares/auth.middleware');
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // app.use(xssClean);
    // app.use(compression());
    // app.use(cors());
    // app.options("*", cors());
    app.use(authMiddleware);
    app.use(Router);

    app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    });
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
