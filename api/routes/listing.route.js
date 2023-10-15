import express from "express";
import { createListing, getUserListing } from "../controllers/listing.cotroller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/user_listing/:id", verifyToken, getUserListing);

export default router;
