import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">Contact us</p>
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
        to={`mailto:phuang56@asu.edu?subject=Regarding seafood e-commerce&body=${message}`}
        className="bg-blue-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
      >
        Send Message
      </Link>
    </div>
  );
}
