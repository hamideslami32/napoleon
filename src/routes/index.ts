import express from "express";

import userRouter from "./users.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


export default router