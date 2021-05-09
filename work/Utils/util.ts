import Joi from 'joi'
const validateSquare = (square: Record<string, any>)=> {
 const schema = Joi.object({
  shape: Joi.string().required(),
  dimension: Joi.number().required().greater(0),
  id: Joi.string()
 });
 return schema.validate(square);
}

const validateRectangle =(rectangle: Record<string, any>) =>{
 const schema = Joi.object({
  shape: Joi.string().required(),
  dimension: Joi.object({
   a: Joi.number().required().greater(0),
   b: Joi.number().required().greater(0),
  })
   .min(2)
   .max(2),
  id: Joi.string(),
 });
 return schema.validate(rectangle);
}

const validateCircle = (circle: Record<string, any>)=> {
 const schema = Joi.object({
  shape: Joi.string().required(),
  dimension: Joi.number().required().greater(0),
  id: Joi.string(),
 });
 return schema.validate(circle);
}

const validateTriangle = (triangle: Record<string, any>)=> {
 const schema = Joi.object({
  shape: Joi.string().required(),
  dimension: Joi.object({
   a: Joi.number().required().greater(0),
   b: Joi.number().required().greater(0),
   c: Joi.number().required().greater(0),
  })
   .min(3)
   .max(3),
  id: Joi.string(),
 });
 return schema.validate(triangle);
}

export default {
  validateCircle,
  validateRectangle,
  validateSquare,
  validateTriangle
}