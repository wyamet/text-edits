// Import openDB method from the 'idb' library
import { openDB, deleteDB, putDb, wrap, unwrap } from "idb";

// Define a function to initialize the database
const initdb = async () => {
  // Open the 'jate' database with version 1
  // If the database doesn't exist yet, upgrade() method will be called
  // Upgrade method will create the 'jate' object store if it doesn't exist
  // and set the key path to 'id' with auto-incrementing values
  const db = await openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });
};

// Define a function to add content to the database
export const putDb = async (content) => {
  console.log("Post to the database");

  // Open the 'jate' database with version 1
  const jateDb = await openDB("jate", 1);

  // Create a read/write transaction on the 'jate' object store
  const tx = jateDb.transaction("jate", "readwrite");

  // Get the 'jate' object store
  const store = tx.objectStore("jate");

  // Use the 'put' method to add or update a value in the object store
  const request = store.put({ id: 1, value: content });

  // Wait for the put operation to complete and log the result
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// Define a function to get all content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Open the 'jate' database with version 1
  const jateDb = await openDB("jate", 1);

  // Create a read-only transaction on the 'jate' object store
  const tx = jateDb.transaction("jate", "readonly");

  // Get the 'jate' object store
  const store = tx.objectStore("jate");

  // Use the 'getAll' method to retrieve all values from the object store
  const request = store.getAll();

  // Wait for the getAll operation to complete and log the result
  const result = await request;
  console.log("result.value", result);
  return result;
};

// Call the initdb function to initialize the database when the module is imported
initdb();
