const axios = require("axios");

// Replace with your own Pixabay API key
const API_KEY = "45411786-4af683a40753fa2c341c9beba";
const BASE_URL = "https://pixabay.com/api/";

// Function to search for images
const searchImages = async (query) => {
    try {
        // Construct the URL with query parameters
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query, // Search query
                image_type: "photo", // Type of images to retrieve
                per_page: 5, // Number of results per page
            },
        });

        // Log the results
        const hits = response.data.hits;
        if (hits.length === 0) {
            console.log("No images found.");
        } else {
            hits.forEach((image, index) => {
                console.log(`Image ${index + 1}:`);
                console.log(`  - ID: ${image.id}`);
                console.log(`  - Tags: ${image.tags}`);
                console.log(`  - URL: ${image.webformatURL}`);
                console.log(`  - Large URL: ${image.largeImageURL}`);
                console.log();
            });
        }
    } catch (error) {
        console.error("Error fetching images:", error.message);
    }
};

// Example usage
searchImages("carrot");
