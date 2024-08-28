const uid = require('uid-safe'); 
const URL = require('../models/URL');

async function generateID(req, res) {
  const { url } = req.body;


  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Check if the URL already exists
    let existingURL = await URL.findOne({ URL: url });

    if (existingURL) {
      // Return the existing short ID if URL already exists
      return res.json({ id: existingURL.shortID });
    }

    // Generate a unique short ID
    let shortID;
    let isUnique = false;

    while (!isUnique) {
      shortID = await uid(6); // Generate a new unique ID

      // Check if the generated ID already exists in the database
      const idExists = await URL.findOne({ shortID });

      if (!idExists) {
        isUnique = true; // Exit the loop if the ID is unique
      }
    }

    // Create a new URL document in the database
    await URL.create({
      shortID: shortID,
      URL: url,
    });

    // Respond with the generated shortID
    return res.json({ id: shortID });

  } catch (err) {
    // Log and return error response
    console.error(err);
    return res.status(500).json({ error: "An error occurred while generating the ID" });
  }
}

module.exports = generateID;
