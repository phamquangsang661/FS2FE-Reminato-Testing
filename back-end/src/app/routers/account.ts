import { Router } from "express";
// import { auth, secretKeyAllow } from "@services/auth";
import { AccountController } from "@app/controllers/account/account-controller";
import { validate } from "@app/middleware/validation";
import { signInSchema } from "@app/controllers/account/account-controller-schema";
const router = Router();
const accountController = new AccountController();

router.post("/sign-in", validate(signInSchema), accountController.signIn);
export { router as accountRouter };
