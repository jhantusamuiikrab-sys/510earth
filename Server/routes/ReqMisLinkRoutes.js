import express from "express";
import {
 getPendingReqMisForms, getReqMisFormById, addCommentToReqMisForm, addSearchLinkToReqMisForm, CommentsAndLinksById
} from "../controllers/ReqmisLinkController.js";

const reqMisLinkRouter = express.Router();

reqMisLinkRouter.get("/", getPendingReqMisForms);
reqMisLinkRouter.get("/:id", getReqMisFormById);
reqMisLinkRouter.put("/:id/comment", addCommentToReqMisForm);
reqMisLinkRouter.put("/:id/search-link", addSearchLinkToReqMisForm);
reqMisLinkRouter.get("/:id/comments-links", CommentsAndLinksById);

export default reqMisLinkRouter;