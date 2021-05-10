"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller/controller"));
const router = express_1.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("<h1>My express App</h1>");
});
router.post("/calculate", controller_1.default.calculate);
exports.default = router;
