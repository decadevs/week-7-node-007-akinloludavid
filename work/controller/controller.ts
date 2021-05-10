
import {Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import Validation from '../Utils/util';
import fs from 'fs';
import path from 'path'
let database = path.join(__dirname, 'database/database.json')
interface shapesObject {
 shape: string;
 dimension: number | Record<string, number>;
 id:string,
 area?: number;
}
const recordsArray:Record<string,number|any>[] = [];

const fetchRecords = (req: Request, res: Response, next: NextFunction) => {
 res.send(recordsArray);
};


const calculate = (req: Request, res: Response) => {
 let field = req.body;
 let newShapes: shapesObject = {
    id: uuidv4(),
  shape: field.shape,
  dimension: field.dimension,
 
 };
 
 if (field.shape === "square") {
   let {error} =Validation.validateSquare(newShapes);
  if (error) {
   return res
    .status(400)
    .send(error.details[0].message);
  }
  newShapes.area = Math.pow(field.dimension, 2);
 } 
 else if (field.shape === "rectangle") {
   let {a,b} = field.dimension
   const {error} =Validation.validateRectangle(newShapes)
   if (error) {
     return res.status(400).send(error.details[0].message)
   }
  newShapes.area = a * b;

 } 
 else if (field.shape === "circle") {
   const {error} = Validation.validateCircle(newShapes)
   if (error){
     return res.status(400).send(error.details[0].message)
   }
  newShapes.area = parseFloat(
   (Math.PI * field.dimension * field.dimension).toFixed(2)
  );
 } 
 
 else if (field.shape === "triangle") {
  const { a, b, c } = field.dimension;
  const { error } = Validation.validateTriangle(newShapes);
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

 recordsArray.push(newShapes);
 fs.writeFileSync(database, JSON.stringify(recordsArray), 'utf-8')
 res.status(201).json(newShapes);
};


export default {
  calculate, 
  fetchRecords, 
 
};
