"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const util_1 = __importDefault(require("../Utils/util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let database = path_1.default.join(__dirname, 'database/database.json');
console.log(database);
const recordsArray = [];
const fetchRecords = (req, res, next) => {
    res.send(recordsArray);
};
const calculate = (req, res) => {
    let field = req.body;
    let newShapes = {
        id: uuid_1.v4(),
        shape: field.shape,
        dimension: field.dimension,
    };
    if (field.shape === "square") {
        let { error } = util_1.default.validateSquare(newShapes);
        if (error) {
            return res
                .status(400)
                .send(error.details[0].message);
        }
        newShapes.area = Math.pow(field.dimension, 2);
    }
    else if (field.shape === "rectangle") {
        let { a, b } = field.dimension;
        const { error } = util_1.default.validateRectangle(newShapes);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        newShapes.area = a * b;
    }
    else if (field.shape === "circle") {
        const { error } = util_1.default.validateCircle(newShapes);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        newShapes.area = parseFloat((Math.PI * field.dimension * field.dimension).toFixed(2));
    }
    else if (field.shape === "triangle") {
        const { a, b, c } = field.dimension;
        const { error } = util_1.default.validateTriangle(newShapes);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        //
        let s = (a + b + c) / 2;
        newShapes.area = parseFloat(Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2));
    }
    else {
        res.status(400).json({ message: "shape defined cannot be found" });
    }
    recordsArray.push(newShapes);
    fs_1.default.writeFileSync(database, JSON.stringify(recordsArray), 'utf-8');
    res.status(201).json(newShapes);
};
exports.default = {
    calculate,
    fetchRecords,
};
