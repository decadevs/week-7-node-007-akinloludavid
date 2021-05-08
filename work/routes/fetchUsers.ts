import {Router, Request, Response, NextFunction} from 'express';
let router = Router();
import controller from '../controller/controller'
/* GET users listing. */
router.get('/', controller.fetchUsers);



export default router;