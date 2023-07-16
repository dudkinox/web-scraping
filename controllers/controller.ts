import exports from "express";
import { getScore } from "../services/scoreService";

const Controller = exports.Router();

Controller.get("", getScore);

export default Controller;
