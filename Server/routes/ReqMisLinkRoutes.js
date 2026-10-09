import express from "express";
import {
 getPendingReqMisForms, getReqMisFormById, addCommentToReqMisForm, addSearchLinkToReqMisForm, CommentsAndLinksById,markNotificationsAsRead
} from "../controllers/ReqmisLinkController.js";

const reqMisLinkRouter = express.Router();

reqMisLinkRouter.get("/", getPendingReqMisForms);
reqMisLinkRouter.get("/:id", getReqMisFormById);
reqMisLinkRouter.put("/:id/comment", addCommentToReqMisForm);
reqMisLinkRouter.put("/:id/search-link", addSearchLinkToReqMisForm);
reqMisLinkRouter.get("/:id/comments-links", CommentsAndLinksById);
reqMisLinkRouter.put("/:id/mark-read", markNotificationsAsRead);

export default reqMisLinkRouter;