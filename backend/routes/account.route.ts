import { Router } from 'express'
import { getBalance, transfer } from '../controller/account.controller';

const router = Router();

router.get("/account/balance", getBalance);

router.post("/account/transfer", transfer);

export default router;