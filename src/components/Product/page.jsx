"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Select from "react-select";
import medicineData from "../../../data/madecine.json";
const MedicineCards = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("A");
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    setLoading(true);
    const medicines = medicineData.data;
    setData(medicines);
    setFiltered(defaultData);
    setLoading(false);
  }, []);
  // 🧠 UseMemo to filter items that start with "A"
  const defaultData = useMemo(() => {
    return data.filter((item) => item.name?.toUpperCase().startsWith("A"));
  }, [data]);
  // 🧪 Apply memoized filtered data
  useEffect(() => {
    setFiltered(defaultData);
  }, [defaultData]);
  // Prepare options for react-select
  const selectOptions = data.map((item) => ({
    value: item.name,
    label: item.name || "No Name",
  }));

  // Handle A-Z filter or "Others"
  const handleFilter = (letter) => {
    if (!data.length) return;

    setActiveFilter(letter); // Update active filter
    setSearchValue(null); // Clear search when A-Z filter is clicked

    if (letter === "Others") {
      const others = data.filter((item) => {
        const firstChar = item.name?.charAt(0).toUpperCase();
        return !/[A-Z]/.test(firstChar);
      });
      setFiltered(others);
    } else {
      const filteredList = data.filter((item) =>
        item.name?.toUpperCase().startsWith(letter)
      );
      setFiltered(filteredList);
    }
  };

  // Handle search filter from react-select
  const handleSearch = (selectedOption) => {
    setSearchValue(selectedOption);

    if (selectedOption) {
      // Filter by selected medicine name
      const filteredList = data.filter(
        (item) =>
          item.name?.toLowerCase() === selectedOption.value?.toLowerCase()
      );
      setFiltered(filteredList);
      setActiveFilter(null); // Clear active filter when searching
    } else {
      // Revert to active filter or default to 'A' if none
      const letter = activeFilter || "A";
      setActiveFilter(letter);
      if (letter === "Others") {
        const others = data.filter((item) => {
          const firstChar = item.name?.charAt(0).toUpperCase();
          return !/[A-Z]/.test(firstChar);
        });
        setFiltered(others);
      } else {
        const filteredList = data.filter((item) =>
          item.name?.toUpperCase().startsWith(letter)
        );
        setFiltered(filteredList);
      }
    }
  };

  const renderValue = (value) => {
    if (!value) return "Unknown";

    if (Array.isArray(value) && typeof value[0] === "string") {
      return value.join(", ");
    }

    if (Array.isArray(value) && typeof value[0] === "object") {
      return (
        <ul className="list-disc list-inside">
          {value.map((obj, i) => (
            <li key={i}>
              {Object.entries(obj)
                .map(([key, val]) => `${key}: ${val}`)
                .join(", ")}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object") {
      return (
        <ul className="list-disc list-inside">
          {Object.entries(value).map(([key, val], i) => (
            <li key={i}>
              <strong>{key}:</strong> {renderValue(val)}
            </li>
          ))}
        </ul>
      );
    }

    return value;
  };

  return (
    <div className="p-2">
      {data.length > 0 && (
        <div className="mb-4 max-w-md mx-auto">
          <Select
            options={selectOptions}
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search by medicine name..."
            isClearable
            isSearchable
            className="text-sm"
          />
        </div>
      )}

      {/* A–Z Filter Buttons */}
      <div className="flex flex-wrap gap-1 justify-center mb-4">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(
          (letter) => (
            <button
              key={letter}
              onClick={() => handleFilter(letter)}
              className={`px-2 py-1 border text-xs ${
                activeFilter === letter
                  ? "bg-[#0053a5] border-[#0053a5] text-white"
                  : "bg-white border-[#0053a5] hover:bg-[#0053a5] hover:text-white"
              }`}
            >
              {letter}
            </button>
          )
        )}
        <button
          onClick={() => handleFilter("Others")}
          className={`px-2 py-1 border text-xs ${
            activeFilter === "Others"
              ? "bg-[#0053a5] border-[#0053a5] text-white"
              : "bg-white border-[#0053a5] hover:bg-[#0053a5] hover:text-white"
          }`}
        >
          Others
        </button>
      </div>

      {/* Loader or Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full text-center text-green-600 font-semibold py-10 animate-pulse">
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <p className="col-span-full text-center text-red-500 py-10 font-semibold">
            No medicine found.
          </p>
        ) : (
          filtered.map((item, index) => (
            <div
              key={index}
              className="bg-white flex items-start shadow-sm overflow-hidden p-2"
            >
              {item.image && (
                <Image
                  src={`https://i.imgur.com/${item.img_id}`}
                  alt={item.name || "Medicine"}
                  width={160}
                  height={160}
                  style={{ width: "auto", height: "auto" }}
                  priority
                  className="object-cover  rounded-xl mr-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-sm font-bold text-gray-800 mb-1">
                  {item.name || "No Name"}
                </h2>

                <div className="text-[12px] text-gray-700 space-y-1">
                  {item.active_ingredients && (
                    <div>{renderValue(item.active_ingredients)}</div>
                  )}
                </div>

                <Link
                  href={`/products/${item.img_id.split(".")[0]}`}
                  className="mt-3 inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-sm"
                >
                  More details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicineCards;
