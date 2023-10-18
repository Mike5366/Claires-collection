import express from "express";
import {
  createListing,
  getUserListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listing.cotroller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/user_listing/:id", verifyToken, getUserListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
