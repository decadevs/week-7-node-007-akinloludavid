"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateSquare = (square) => {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.number().required().greater(0),
        id: joi_1.default.string()
    });
    return schema.validate(square);
};
const validateRectangle = (rectangle) => {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.object({
            a: joi_1.default.number().required().greater(0),
            b: joi_1.default.number().required().greater(0),
        })
            .min(2)
            .max(2),
        id: joi_1.default.string(),
    });
    return schema.validate(rectangle);
};
const validateCircle = (circle) => {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.number().required().greater(0),
        id: joi_1.default.string(),
    });
    return schema.validate(circle);
};
const validateTriangle = (triangle) => {
    const schema = joi_1.default.object({
        shape: joi_1.default.string().required(),
        dimension: joi_1.default.object({
            a: joi_1.default.number().required().greater(0),
            b: joi_1.default.number().required().greater(0),
            c: joi_1.default.number().required().greater(0),
        })
            .min(3)
            .max(3),
        id: joi_1.default.string(),
    });
    return schema.validate(triangle);
};
exports.default = {
    validateCircle,
    validateRectangle,
    validateSquare,
    validateTriangle
};
