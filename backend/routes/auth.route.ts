import { Router } from 'express'
import { signin, signup } from '../controller/auth.controller';

const router = Router();

router.post("/user/signup", signup);

router.post("/user/signin", signin);

export default router;