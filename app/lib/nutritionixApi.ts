const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID!;
const NUTRITIONIX_APP_KEY = process.env.NUTRITIONIX_APP_KEY!;


export const fetchFoodData = async (query: string) => {
    const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                "x-app-id": NUTRITIONIX_APP_ID,
                "x-app-key": NUTRITIONIX_APP_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}