"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = express_1.Router();
const controller_1 = __importDefault(require("../controller/controller"));
/* GET users listing. */
router.get('/', controller_1.default.fetchUsers);
router.post('/calculate', controller_1.default.calculate);
exports.default = router;
