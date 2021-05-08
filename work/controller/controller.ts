
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
   let {error} =validateSquare(newShapes);
  if (error) {
   return res
    .status(400)
    .send(error.details[0].message);
  }
  newShapes.area = Math.pow(field.dimension, 2);
 } 
 else if (field.shape === "rectangle") {
   let {a,b} = field.dimension
   const {error} =validateRectangle(newShapes)
   if (error) {
     return res.status(400).send(error.details[0].message)
   }
  newShapes.area = a * b;

 } 
 else if (field.shape === "circle") {
   const {error} = validateCircle(newShapes)
   if (error){
     return res.status(400).send(error.details[0].message)
   }
  newShapes.area = parseFloat(
   (Math.PI * field.dimension * field.dimension).toFixed(2)
  );
 } 
 
 else if (field.shape === "triangle") {
  const { a, b, c } = field.dimension;
  const { error } = validateTriangle(newShapes);
  if (error){
    return res.status(400).send(error.details[0].message)
  }
  //
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

function validateSquare(square:Record<string, any>){
  const schema = Joi.object({
    shape: Joi.string().required(),
    dimension: Joi.number()
                .required()
                .greater(0)
  })
  return schema.validate(square)
}

function validateRectangle(rectangle:Record<string, any>){
  const schema = Joi.object({
    shape: Joi.string().required(),
    dimension: Joi.object({
      a:Joi.number().required().greater(0), 
      b: Joi.number().required().greater(0)
    })
  })
  return schema.validate(rectangle)
}

function validateCircle (circle:Record<string, any>){
  const schema = Joi.object({
   shape: Joi.string().required(),
   dimension: Joi.number().required().greater(0),
  });
  return schema.validate(circle);
}


function validateTriangle(triangle: Record<string, any>) {
 const schema = Joi.object({
  shape: Joi.string().required(),
  dimension: Joi.object({
   a: Joi.number().required().greater(0),
   b: Joi.number().required().greater(0),
   c: Joi.number().required().greater(0),
  }),
 });
 return schema.validate(triangle);
}
export default {
  calculate, 
  fetchUsers, 
 
};
