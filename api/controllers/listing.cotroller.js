import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
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

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(404, "Listing not found!"));
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only delete your own listings"));

  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(404, "Listing not found!"));
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only update your own listings"));

  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.status(200).json("Listing has been updated!");
  } catch (error) {
    next(error);
  }
};
