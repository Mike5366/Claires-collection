import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ListingItem from "../components/ListingItem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 720 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 720, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const [offerListings, setOfferListings] = useState([]);
  const [seaFoodListings, setSeafoodListings] = useState([]);
  const [meatListings, setMeatListings] = useState([]);
  const [vegetableListings, setVegetableListings] = useState([]);
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  console.log(meatListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/listing/get?offer=true&limit=4`
        );
        const data = await res.json();
        setOfferListings(data);
        fetchSeafoodListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSeafoodListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/listing/get?category=seafood&limit=4`
        );
        const data = await res.json();
        setSeafoodListings(data);
        fetchMeatListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMeatListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/listing/get?category=meat&limit=4`
        );
        const data = await res.json();
        setMeatListings(data);
        fetchVegetableListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVegetableListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/listing/get?category=vegetable&limit=4`
        );
        const data = await res.json();
        setVegetableListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find <span className="text-slate-500">fresh</span> food in Mikie
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Mikie offers all kind's of groceries including seafood, meat,
          vegetable and deli.
          <br />
          Freshness and hygiene are our priorities.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:opacity-95"
        >
          Shop now
        </Link>
      </div>

      {/* swiper */}
      <Swiper autoplay={{ delay: 4000 }}>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing result for offer, and category */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=seafood"}
              >
                Show more
              </Link>
            </div>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              smoothScroll={true}
              removeArrowOnDeviceType={["mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {offerListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {seaFoodListings && seaFoodListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Seafood</h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=seafood"}
              >
                Show more
              </Link>
            </div>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              smoothScroll={true}
              removeArrowOnDeviceType={["mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {seaFoodListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {meatListings && meatListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Meat</h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=meat"}
              >
                Show more
              </Link>
            </div>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              smoothScroll={true}
              removeArrowOnDeviceType={["mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {meatListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {vegetableListings && vegetableListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Vegetable
              </h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=vegetable"}
              >
                Show more
              </Link>
            </div>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              smoothScroll={true}
              removeArrowOnDeviceType={["mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {vegetableListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
