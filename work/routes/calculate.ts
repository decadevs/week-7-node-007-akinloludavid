import { Router, Request, Response, NextFunction } from "express";
import controller from "../controller/controller";

const router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
 res.send("<h1>My express App</h1>");
});

router.post("/calculate", controller.calculate);
export default router;
