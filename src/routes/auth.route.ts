import * as authController from "../controllers/auth.controller";
import * as authValidation from "../validations/auth.validation";
import express from "express";
import { validate } from "../middlewares/validate.middleware";

const router = express.Router();

router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post(
  "/refresh",
  validate(authValidation.refresh),
  authController.refresh
);

export default router;
