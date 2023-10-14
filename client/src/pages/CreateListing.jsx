import React from "react";
import CreatableAdvanced from "../components/CreateableSelect";
import { productCategory } from "../profile/prodoctCategory.js";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Product
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="1"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <CreatableAdvanced/>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <p>Inventory</p>
                <span className="text-xs">(-1 for no limit)</span>
              </div>
              <input
                type="number"
                placeholder="0"
                id="inventory"
                min="-1"
                max="99999"
                required
                className="p-3 border
                border-gray-300
                rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Unit"
                id="unit"
                required
                className="p-3 border
                border-gray-300
                rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">(per unit)</span>
              </div>
              <input
                type="number"
                placeholder="0"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border
                border-gray-300
                rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <p>Discount price</p>
                <span className="text-xs">(per unit)</span>
              </div>
              <input
                type="number"
                placeholder="0"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border
                border-gray-300
                rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="='font-normal text-gray-600 ml-2">
              The first image will be the cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-grey-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase">
            Create Product
          </button>
        </div>
      </form>
    </main>
  );
}
