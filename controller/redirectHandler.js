const URL = require ("../models/URL");

async function getURL(req,res) {

    const { shortID } = req.params; // Extract the shortID from the URL parameters
  
    try {
        // Find the URL document by shortID
        const urlEntry = await URL.findOne({ shortID });

        if (urlEntry) {
            // Redirect to the original URL
            return res.redirect(urlEntry.URL);
        } else {
            //  shortID is not found
            return res.status(404).json({ error: "URL not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred" });
    }
    
}

module.exports = getURL