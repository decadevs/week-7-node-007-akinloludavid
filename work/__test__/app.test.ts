import app from '../app';
import request from 'supertest';
interface shapesObject {
 shape: string;
 dimension: number | Record<string, number>;
 area?: number;
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
