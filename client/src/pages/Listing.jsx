import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    SwiperCore.use([Navigation]);
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/listing/get/${params.listingId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);

          return;
        }
        setListing(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.ListingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col p-3 max-w-2xl mx-auto">
            <p className="text-2xl font-semibold p-3">
              {listing.name} - {" $ "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {" / "}
              {listing.unit}
            </p>
            <p className="flex item-center mt-6 p-2 text-slate-600 my-2 text-md gap-1">
              <FaMapMarkerAlt className="text-green-700" />
              origin
            </p>
            <div className="flex item-center p-1 gap-3">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.category}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                  {" off"}
                </p>
              )}
            </div>
            <p className="text-slate-800 p-2 gap-3">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            {currentUser && currentUser.role === "user" && (
              <div className="flex flex-col mt-6 p-2 gap-3">
                <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3">
                  Add to cart
                </button>
              </div>
            )}

            {currentUser && !contact && (
              <div className="flex flex-col p-2 gap-3">
                <button
                  onClick={() => setContact(true)}
                  className="bg-blue-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                  Contact us
                </button>
              </div>
            )}
            {contact && (
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
