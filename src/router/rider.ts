import { riderSignIn, riderSignUp } from "#/controller/rider";
import { Router } from "express";

const router = Router();

router.post('/rider-signup', riderSignUp);
router.post('/rider-signin', riderSignIn);

export default router;