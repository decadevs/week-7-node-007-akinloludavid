"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const database = require("../database/database.json");
const fetchUsers = (req, res, next) => {
    res.send(database);
};
const calculate = (req, res) => {
    let field = req.body;
    let newShapes = {
        shape: field.shape,
        dimension: field.dimension,
    };
    if (field.shape === "square") {
        let { error } = validateSquare(newShapes);
        if (error) {
            return res
                .status(400)
                .send(error.details[0].message);
        }
        newShapes.area = Math.pow(field.dimension, 2);
    }
    else if (field.shape === "rectangle") {
        let { a, b } = field.dimension;
        const { error } = validateRectangle(newShapes);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        newShapes.area = a * b;
    }
    else if (field.shape === "circle") {
        const { error } = validateCircle(newShapes);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        newShapes.area = parseFloat((Math.PI * field.dimension * field.dimension).toFixed(2));
    }
    else if (field.shape === "triangle") {
        const { a, b, c } = field.dimension;
        const { error } = validateTriangle(newShapes);
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
    database.push(newShapes);
    res.status(201).json(newShapes);
};
function validateSquare(square) {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.number()
            .required()
            .greater(0)
    });
    return schema.validate(square);
}
function validateRectangle(rectangle) {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.object({
            a: joi_1.default.number().required().greater(0),
            b: joi_1.default.number().required().greater(0)
        })
    });
    return schema.validate(rectangle);
}
function validateCircle(circle) {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.number().required().greater(0),
    });
    return schema.validate(circle);
}
function validateTriangle(triangle) {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.object({
            a: joi_1.default.number().required().greater(0),
            b: joi_1.default.number().required().greater(0),
            c: joi_1.default.number().required().greater(0),
        }),
    });
    return schema.validate(triangle);
}
exports.default = {
    calculate,
    fetchUsers,
};
