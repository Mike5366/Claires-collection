import express from "express";
import { createListing, getUserListing, deleteListing } from "../controllers/listing.cotroller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/user_listing/:id", verifyToken, getUserListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
