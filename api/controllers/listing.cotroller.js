import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  console.log(req);
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only view your own listings!"));
  try {
    const listing = await Listing.find({ userRef: req.params.id });
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
