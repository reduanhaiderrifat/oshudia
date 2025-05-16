"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import medicineData from "../../../data/madecine.json";
import { Rnd } from "react-rnd";

import { openEarnedDB } from "@/utility/IndexedDB";
const ProductDetails = () => {
  const { img_id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [activeButtons, setActiveButtons] = useState([]);
  const [left, setLeft] = useState([]);
  const [lockUntil, setLockUntil] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicines = medicineData.data;
        const found = medicines.find(
          (item) => item.img_id.split(".")[0] === img_id
        );
        setMedicine(found);
      } catch (err) {
        console.error("Error fetching data:");
      }
    };
    fetchData();
  }, [img_id]);
 


  // Add star to IndexedDB
  const addStarToDB = async () => {
    const db = await openEarnedDB();
    await db.put("stars", { star: "*" });
  };

  // Load and cleanup expired buttons from localStorage
  useEffect(() => {
    const now = Date.now();
    let stored = localStorage.getItem("btn");
    let parsed = [];

    if (stored) {
      try {
        parsed = JSON.parse(stored);
        parsed = parsed.filter(({ expiresAt }) => expiresAt > now);
      } catch (e) {
        console.error("Failed to parse btn storage:");
      }
    }

    setActiveButtons(parsed);
    setLeft(parsed); // Use the actual parsed array

    const interval = setInterval(() => {
      const now = Date.now();
      // update all time
  
      setActiveButtons((prev) => {
        const updated = prev.filter((entry) => entry.expiresAt > now);
        localStorage.setItem("btn", JSON.stringify(updated));
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEarnClick = () => {
    const fiveMinutesLater = Date.now() + 5 * 60 * 1000;

    setActiveButtons((prev) => {
      const updated = [
        ...prev.filter((entry) => entry.img_id !== img_id),
        { img_id, expiresAt: fiveMinutesLater },
      ];
      // If now 10 items, lock further clicking for 10 minutes
      if (updated.length === 10) {
        const lockUntil = Date.now() + 10 * 60 * 1000; // 10 mins
        localStorage.setItem("lockUntil", lockUntil.toString());
      }
      localStorage.setItem("btn", JSON.stringify(updated));
      return updated;
    });

    // Add star to IndexedDB when button is clicked
    addStarToDB();
  };

  useEffect(() => {
    const storedLock = localStorage.getItem("lockUntil");
    if (storedLock && Date.now() < parseInt(storedLock)) {
      setLockUntil(parseInt(storedLock));
    }

    const interval = setInterval(() => {
      const storedLock = localStorage.getItem("lockUntil");
      if (storedLock && Date.now() >= parseInt(storedLock)) {
        localStorage.removeItem("lockUntil");
        setLockUntil(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isButtonDisabled = activeButtons.some(
    (entry) => entry.img_id === img_id
  );

  if (!medicine) return <div className="text-center">Loading...</div>;

  const renderValue = (value, key) => {
    if (!value) return "Not Available";
    if (key === "image" || key === "img_id") return null;

    if (Array.isArray(value) && typeof value[0] === "string") {
      return value.join(", ");
    }

    if (Array.isArray(value) && typeof value[0] === "object") {
      return value.map((item, idx) => (
        <div key={idx} className="space-y-1">
          {Object.entries(item).map(([key, val]) => (
            <div key={key} className="text-gray-600">
              <strong>{key.replace(/_/g, " ")}:</strong> {renderValue(val, key)}
            </div>
          ))}
        </div>
      ));
    }

    if (typeof value === "object") {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([key, val], i) => (
            <div key={i} className="text-gray-600">
              <strong>{key.replace(/_/g, " ")}:</strong> {renderValue(val, key)}
            </div>
          ))}
        </div>
      );
    }

    return value;
  };
  const getRemainingTime = () => {
    const button = activeButtons.find((entry) => entry.img_id === img_id);
    if (!button) return null;

    const totalSeconds = Math.floor((button.expiresAt - Date.now()) / 1000);
    const clampedSeconds = totalSeconds > 0 ? totalSeconds : 0;

    const minutes = Math.floor(clampedSeconds / 60);
    const seconds = clampedSeconds % 60;

    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  };

  return (
    <div className="p-2 md:p-6 max-w-5xl mx-auto rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {medicine.name}
      </h1>

      <div className="flex justify-center">
        {medicine.img_id && (
          <Image
            src={`https://i.imgur.com/${medicine.img_id}`}
            alt={medicine.name}
            width={280}
            height={280}
            style={{ width: "auto", height: "auto" }}
            priority
            className="object-cover mb-6 pointer-none cursor-not-allowed"
          />
        )}
      </div>

      <div className="mt-6 space-y-3">
        {Object.entries(medicine).map(([key, value]) => {
          if (key === "image" || key === "img_id") return null;
          return (
            <div key={key} className="space-y-1">
              <strong className="text-gray-600 bg-green-200 px-1">
                {key.replace(/_/g, " ")}:
              </strong>{" "}
              {renderValue(value, key)}
            </div>
          );
        })}
      </div>

      <Rnd
        default={{
          x: 0,
          y: window.innerHeight - 80,
          width: 180,
          height: 100,
        }}
        bounds="window"
        dragAxis="both"
      >
        {(left.length < 10 || Date.now() >= lockUntil) && (
          <button
            className={`btn bg-blue-600 text-white px-4 py-2 rounded ${
              isButtonDisabled
                ? "bg-blue-600 cursor-not-allowed"
                : "bg-blue-600"
            }`}
            disabled={isButtonDisabled}
            onClick={handleEarnClick}
          >
            {isButtonDisabled
              ? `Wait ${getRemainingTime()}`
              : "Earn to click me"}
          </button>
        )}
      </Rnd>

    </div>
  );
};

export default ProductDetails;
