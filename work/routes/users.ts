import {Router, Request, Response, NextFunction} from 'express';
let router = Router();
import controller from '../controller/controller'
/* GET users listing. */
router.get('/', controller.fetchUsers);

router.post('/calculate', controller.calculate)

export default router;