import app from '../app';
import request from 'supertest';
interface shapesObject {
 shape: string;
 dimension: number | Record<string, number>;
 area?: number;
}
let square: shapesObject = {
 shape: "square",
 dimension: 5,
};
let circle: shapesObject ={
  shape:"circle",
  dimension: 7,
}


let rectangle: shapesObject = {
  shape: "rectangle",
  dimension: {
    "a":4, "b":5
  },
}

let triangle: shapesObject = {
  shape:"triangle",
  dimension: {
    "a":3, "b":4, "c":5
  },
}
describe('Running tests for all the end points of this API', ()=>{
  
  test('Testing GET at /fetchRecords', async () => {
    const res = await request(app).get('/fetchRecords')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true);
  })

  test ('Testing POST at /calculate', async () => {
    let newShape:shapesObject={
      shape:"square",
      dimension:5
    }
    const res = await request(app).post('/calculate').send(newShape)
    expect(res.status).toBe(201)
  })


})

describe("Running test for the correct formula for area", ()=>{
  test("Testing for the area of a square", ()=>{

    
    square.area = (+square.dimension) * (+square.dimension);
    expect(square.area).toBe(25)
  })

  test("Testing for the area of a circle", () => {
    circle.area = Math.round(Math.PI * (+circle.dimension) * (+circle.dimension));
   expect(circle.area).toBeCloseTo(154);
  });

  test("Testing for the area of a rectangle", () => {
  rectangle.area = rectangle.dimension['a'] * rectangle.dimension['b']   
  expect(rectangle.area).toBe(20);
  });
  test("Testing for the area of a triangle", () => {
    let a = triangle.dimension['a'], b = triangle.dimension['b'], c = triangle.dimension['c']
    let s = (a+b+c)/2
    triangle.area = +Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);

   expect(triangle.area).toBe(6);
  });
})