import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setSeller(data);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    };

    fetchSeller();
  }, [listing.userRef]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="flex flex-col gap-3">
      <p>Contact <span className="font-semibold">{seller?.username}</span> for <span className="font-semibold">{listing?.name.toLowerCase()}</span></p>
      <textarea
        name="message"
        id="message"
        rows="2"
        value={message}
        onChange={handleChange}
        placeholder="Enter your message here..."
        className="w-full border p-3 ronded-lg"
      ></textarea>

      <Link
        to={`mailto:${seller?.email}?subject=Regarding ${listing?.name}&body=${message}`}
        className="bg-blue-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
      >
        Send Message
      </Link>
    </div>
  );
}
