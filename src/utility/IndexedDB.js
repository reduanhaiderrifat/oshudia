 // Open IndexedDB to store earned stars
 import { openDB } from "idb";
 export  const openEarnedDB = async () => {
    const db = await openDB("SharedDB", 1, {
      upgrade(db) {
        db.createObjectStore("stars", {
          keyPath: "id",
          autoIncrement: true,
        });
      },
    });
    return db;
  };

  export   const getStarsFromDB = async () => {
    const db = await openEarnedDB();
    const tx = db.transaction("stars", "readonly");
    const store = tx.objectStore("stars");
    const allStars = await store.getAll();
    return allStars.length;
  };