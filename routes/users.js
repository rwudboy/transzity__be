import express from "express";
import { getTestapi,register, getUsers, login, logout } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/registerUser", register);
router.get("/getAllUsers", getUsers);
router.get("/getTestapi2", getTestapi);
router.post("/login", login);
router.post("/logout", logout);

export default router;
