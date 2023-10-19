import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-500"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">origin</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <div className="flex">
            <div>
              <p>
                {/* {!listing.offer && listing.regularPrice} */}
                {" $ "}
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                <span className="text-xs align-text-bottom">
                  {" / "}
                  {listing.unit}{" "}
                </span>
              </p>
              {listing.offer && (
                <p className="text-xs text-gray-600">
                  {"List Price: $ "}
                  <span className="">
                    {listing.regularPrice.toLocaleString("en-US")}
                  </span>
                </p>
              )}
            </div>
            {listing.offer && (
              <p className=" flex-1 text-red-700 text-right text-2xl">
                {(
                  ((+listing.regularPrice - +listing.discountPrice) / +listing.regularPrice) *
                  100
                ).toFixed(0)}
                {"% off"}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
