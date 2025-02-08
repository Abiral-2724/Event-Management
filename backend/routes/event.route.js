import express from "express";
import { eventImageUpload } from "../middleware/multer.js";
import isAuthenticated from "../middleware/auth.js";
import { createEvent, getAllEvents, searchEvents } from "../controllers/event.controller.js";

const router = express.Router();


router.route("/create").post(isAuthenticated ,eventImageUpload,createEvent);
router.route('/allevents').get(getAllEvents);
router.route('/search').get(searchEvents) ;
export default router;
