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
  const [dessertListings, setDessertListings] = useState([]);
  const [dishListings, setDishListings] = useState([]);
  const [soapListings, setSoapListings] = useState([]);
  const [lipBalmListings, setLipBalmListings] = useState([]);
  const [potteryListings, setPotteryListings] = useState([]);
  const [bagListings, setBagListings] = useState([]);

  SwiperCore.use([Navigation, Pagination, Autoplay]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?offer=true&limit=4`
        );
        const data = await res.json();
        setOfferListings(data);
        fetchDessertListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDessertListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?category=dessert&limit=4`
        );
        const data = await res.json();
        setDessertListings(data);
        fetchDishListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDishListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?category=dish&limit=4`
        );
        const data = await res.json();
        setDishListings(data);
        fetchSoapListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSoapListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?category=soap&limit=4`
        );
        const data = await res.json();
        setSoapListings(data);
        fetchLipBalmListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLipBalmListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?category=lipbalm&limit=4`
        );
        const data = await res.json();
        setLipBalmListings(data);
        fetchPotteryListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPotteryListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?category=pottery&limit=4`
        );
        const data = await res.json();
        setPotteryListings(data);
        fetchBagListings();
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchBagListings = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?category=bag&limit=4`
        );
        const data = await res.json();
        setBagListings(data);
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
          Find <span className="text-slate-500">exquisite</span> stuff in Claire's Collection
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Claire's Collection offers all kind's of handmade stuff including dessert, dishes,
          and soap.
          <br />
          Make your life more ritualistic.
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
                to={"/search?offer=true"}
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
        {dessertListings && dessertListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Dessert</h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=dessert"}
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
              {dessertListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {dishListings && dishListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Dish</h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=dish"}
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
              {dishListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {soapListings && soapListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Soap
              </h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=soap"}
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
              {soapListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {lipBalmListings && lipBalmListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Lip Balm
              </h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=lipbalm"}
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
              {lipBalmListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {potteryListings && potteryListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Pottery
              </h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=pottery"}
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
              {potteryListings.map((listing) => (
                <div className="mb-10">
                  <ListingItem listing={listing} key={listing._id} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
        {bagListings && bagListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Bag
              </h2>
              <Link
                className="text-sm text-blue-800 hover:text-red-500"
                to={"/search?category=bag"}
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
              {bagListings.map((listing) => (
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
