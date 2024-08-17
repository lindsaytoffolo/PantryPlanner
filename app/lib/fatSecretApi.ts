import axios from 'axios';
import crypto from 'crypto';
import querystring from 'querystring';

const FATSECRET_CONSUMER_KEY = process.env.FATSECRET_CONSUMER_KEY!;
const FATSECRET_CONSUMER_SECRET = process.env.FATSECRET_CONSUMER_SECRET!;
const FATSECRET_URL = 'https://platform.fatsecret.com/rest/server.api';

// Generate a unique OAuth nonce
const generateNonce = () =>
    Math.random().toString(36).replace(/[^a-z]/, '').substr(2);

// Create a normalized parameter string
const constructParamsString = (params: Record<string, any>) => {
    return Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .sort()
        .join('&');
};

// Create a signature base string
const createSignatureBaseString = (params: Record<string, any>) => {
    const paramsStr = constructParamsString(params);
    return `POST&${encodeURIComponent(FATSECRET_URL)}&${encodeURIComponent(paramsStr)}`;
};

// Calculate HMAC-SHA1 signature
const calculateSignature = (baseString: string) => {
    const signingKey = `${encodeURIComponent(FATSECRET_CONSUMER_SECRET)}&`;
    return crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
};

// Main function to perform search
export const search = async (query: string) => {
    const oauthParams: Record<string, string> = {
        format: 'json',
        method: 'foods.search',
        oauth_consumer_key: FATSECRET_CONSUMER_KEY,
        oauth_nonce: generateNonce(),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        oauth_version: '1.0',
        search_expression: query,
    };

    const baseString = createSignatureBaseString(oauthParams);
    oauthParams['oauth_signature'] = calculateSignature(baseString);

    const params = querystring.stringify(oauthParams);

    try {
        const response = await axios.post(FATSECRET_URL, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error making API request');
    }
};
