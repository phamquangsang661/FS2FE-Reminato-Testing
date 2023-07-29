import { Router } from "express";
import { AccountController } from "@app/controllers/account/account-controller";
import { validate } from "@app/middleware/validation";
import { signInSchema } from "@app/controllers/account/account-controller-schema";
import { auth } from "@services/auth";
const router = Router();
const accountController = new AccountController();

router.post("/sign-in", validate(signInSchema), accountController.signIn);
router.get(
  "/me",
  auth.authenticate("jwt", { session: false }),
  accountController.getUserMe
);
export { router as accountRouter };
