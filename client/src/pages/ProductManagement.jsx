import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProductManagement() {
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    handleShowListings();
  }, []);

  const handleShowListings = async () => {
    try {
      console.log(currentUser._id);
      const res = await fetch(
        `http://localhost:3000/api/listing/user_listing/${currentUser._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      setShowListingsError(false);
    } catch (error) {
      setShowListingsError(true);
      console.log(error);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <p className="text-red-700 mt-5">
          {showListingsError ? "Error showing listings" : ""}
        </p>
        <div className="flex flex-col gap-4 flex-1">
          {userListings && userListings.length > 0 && (
            <div className="flex flex-col gap-4">
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-lg p-3 flex justify-between items-center gap-4"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="w-15 h-15 object-contain rounded-lg"
                    />
                  </Link>
                  <Link
                    to={`/listing/${listing._id}`}
                    className="text-slate-700 font-semibold flex-1 hover:opacity-95 truncate"
                  >
                    <p>{listing.name}</p>
                  </Link>
                  <div className="flex flex-col item-center gap-2 p-5">
                    <button className="bg-green-700 text-white uppercase rounded-xl p-3 hover:opacity-95">
                      Edit
                    </button>
                    <button className="bg-red-700 text-white uppercase rounded-xl p-3 hover:opacity-95">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 flex-3">
          <Link
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            to={"/create-listing"}
          >
            Creat Product
          </Link>
        </div>
      </div>
    </main>
  );
}
