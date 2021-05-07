
import {Request, Response, NextFunction } from "express";
import Joi from 'joi';
const database = require("../database/database.json");

interface shapesObject {
 shape: string;
 dimension: number | Record<string, number>;
 area?: number;
}

const fetchUsers = (req: Request, res: Response, next: NextFunction) => {
 res.send(database);
};


const calculate = (req: Request, res: Response) => {
 let field = req.body;
 let newShapes: shapesObject = {
  shape: field.shape,
  dimension: field.dimension,
 };
 if (field.shape === "square") {
  if (typeof field.dimension !== "number") {
   return res
    .status(400)
    .json({ message: "The shape square only requires one dimension" });
  }
  newShapes.area = Math.pow(field.dimension, 2);
 } else if (field.shape === "rectangle") {
   let {a,b} = field.dimension
   if (!a || !b || typeof a !=='number' || typeof b !== 'number') {
     return res.status(400).json({message:"Dimensions cannot be undefined. Dimensions have to be a valid number"})
   }
  newShapes.area = a * b;
 } else if (field.shape === "circle") {
   if (typeof field.dimension !== 'number'){
     return res.status(400).json({message:"The dimension of the circle is its radius, hence it has to be a valid number."})
   }
  newShapes.area = parseFloat(
   (Math.PI * field.dimension * field.dimension).toFixed(2)
  );
 } else if (field.shape === "triangle") {
  const { a, b, c } = field.dimension;
  if (!a || !b ||!c || typeof a !== "number" || typeof b !== "number"|| typeof c !== 'number'){
    return res.status(400).json({message:"Invalid dimensions. all dimensions must be a valid number"})
  }
   let s = (a + b + c) / 2;
  newShapes.area = parseFloat(
   Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2)
  );
 } else {
  res.status(400).json({ message: "shape defined cannot be found" });
 }
 database.push(newShapes);
 res.status(201).json(newShapes);
};

export default {calculate, fetchUsers};
