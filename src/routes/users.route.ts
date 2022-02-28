import * as userController from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.get("/", userController.getUsers);


export default router;