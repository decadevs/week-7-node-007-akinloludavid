import { Router,Request, Response,NextFunction } from "express";
import controller from '../controller/controller'

const router =Router();

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  res.render('index', { title: 'Express' });
});

router.post("/calculate", controller.calculate);
export default router;