import { Router } from "express";
import { validate } from "@app/middleware/validation";
import { auth } from "@services/auth";
import { VideoShareController } from "@app/controllers/video-share/video-share-controller";
import {
  getPublicVideoSharingSchema,
  sharingVideoSchema,
} from "@app/controllers/video-share/video-share-schema";
const router = Router();
const videoShareController = new VideoShareController();

router.post(
  "/share",
  auth.authenticate("jwt"),
  validate(sharingVideoSchema),
  videoShareController.sharingVideo
);

router.get(
  "/",
  auth.authenticate("auth_not_required"),
  validate(getPublicVideoSharingSchema),
  videoShareController.getPublicVideos
);
export { router as videoShareRouter };
