import Select from "react-select";
import { useEffect, useState } from "react";
import { productCategory } from "../profile/prodoctCategory.js";
import { sortCategory } from "../profile/sortCategory.js";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    category: "",
    offer: false,
    sort: "",
    order: "",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, serError] = useState(false);
  const navigate = useNavigate();
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const categoryFromUrl = urlParams.get("category");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      categoryFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
        category: categoryFromUrl || "all",
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(
          `http://localhost:3000/api/listing/get?${searchQuery}`
        );
        const data = await res.json();
        if (data.success === false) {
          serError(true);
          setLoading(false);
          return;
        }
        setListings(data);
        setLoading(false);
        serError(false);
      } catch (error) {
        serError(true);
        setLoading(false);
        console.log(error);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "offer") {
      setSideBarData({
        ...sideBarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }
  };

  const handleCategoryChange = (e) => {
    setSideBarData({ ...sideBarData, category: e.value });
  };

  const handleSortChange = (e) => {
    const sort = e.value.split("_")[0] || "createdAt";
    const order = e.value.split("_")[1] || "desc";

    setSideBarData({ ...sideBarData, sort, order });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("category", sideBarData.category);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            {/* <label className='whitespace-nowrap'>Search Term:</label> */}
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <input
              type="checkbox"
              id="offer"
              className="w-5"
              checked={sideBarData.offer}
              onChange={handleChange}
            />
            <span>Offer</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              id="category"
              className="p-3"
              options={productCategory}
              onChange={handleCategoryChange}
              value={productCategory.filter(
                (e) => e.value === sideBarData.category
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select
              id="sort_order"
              className="p-3"
              defaultValue={sortCategory.at(3)}
              options={sortCategory}
              onChange={handleSortChange}
              value={sortCategory.filter(
                (e) => e.value === sideBarData.sort + "_" + sideBarData.order
              )}
            />
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="text-3xl font-semibold border-b p-3 text-slate-700">
        Listing results:
      </div>
    </div>
  );
}
