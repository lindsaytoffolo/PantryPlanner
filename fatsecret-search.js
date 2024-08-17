const axios = require("axios");
const crypto = require("crypto");
const querystring = require("querystring");

const FATSECRET_CONSUMER_KEY = "9039723f19944ffa9edd8c7948b168e5";
const FATSECRET_CONSUMER_SECRET = "57c1988d62254c6b9ffbd04535453e32";

const fatSecretRestUrl = "https://platform.fatsecret.com/rest/server.api";
const date = new Date();

// Generate a unique OAuth nonce
const generateNonce = () =>
    Math.random()
        .toString(36)
        .replace(/[^a-z]/, "")
        .substr(2);

// Create a normalized parameter string
const constructParamsString = (params) => {
    return Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .sort()
        .join("&");
};

// Create a signature base string
const createSignatureBaseString = (params) => {
    const paramsStr = constructParamsString(params);
    return `POST&${encodeURIComponent(fatSecretRestUrl)}&${encodeURIComponent(paramsStr)}`;
};

// Calculate HMAC-SHA1 signature
const calculateSignature = (baseString) => {
    const signingKey = `${encodeURIComponent(FATSECRET_CONSUMER_SECRET)}&`;
    return crypto.createHmac("sha1", signingKey).update(baseString).digest("base64");
};

// Main search function
const search = async (query) => {
    const oauthParams = {
        format: "json",
        method: "foods.search",
        oauth_consumer_key: consumerKey,
        oauth_nonce: generateNonce(),
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.floor(date.getTime() / 1000),
        oauth_version: "1.0",
        search_expression: query,
    };

    const baseString = createSignatureBaseString(oauthParams);
    oauthParams.oauth_signature = calculateSignature(baseString);

    try {
        const response = await axios.post(fatSecretRestUrl, querystring.stringify(oauthParams), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log(JSON.stringify(response.data.foods, null, 2));
        // console.log(JSON.stringify(response.data.foods.food[0], null, 2));
    } catch (error) {
        console.error(
            "Error making request:",
            error.response ? error.response.data : error.message
        );
    }
};

// search("carrot");
search("tomato sauce");
