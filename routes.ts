import { login, signup } from "./controller/AuthController";
import express from "express";
const route = express.Router();
route.post("/signup", signup);
route.post("/login", login);
export default route;
