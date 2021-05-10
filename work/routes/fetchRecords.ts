import {Router, Request, Response, NextFunction} from 'express';
let router = Router();
import controller from '../controller/controller'
/* GET Records listing. */
router.get('/', controller.fetchRecords);



export default router;