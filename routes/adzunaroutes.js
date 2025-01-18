const express = require('express');
const axios = require('axios');
const router = express.Router();
const fetch= require('node-fetch');

// Adzuna API Configuration
const API_URL = 'https://api.adzuna.com/v1/api/jobs/in/search/1'; // India endpoint
const APP_ID = process.env.ADZUNA_APP_ID || 'your-app-id'; // Use environment variables for security
const APP_KEY = process.env.ADZUNA_APP_KEY || 'your-app-key'; // Use environment variables for security

// Middleware to check API credentials
router.use((req, res, next) => {
    if (!APP_ID || !APP_KEY) {
        return res.status(500).json({
            message: 'API credentials are missing. Please set the APP_ID and APP_KEY.',
        });
    }
    next();
});

// Route to Fetch Jobs
router.get('/fetch-jobs', async (req, res) => {
    const { keyword, location } = req.query;

    // Log query parameters
    console.log('Fetching jobs with:', { keyword, location });

    try {
        const response = await axios.get(API_URL, {
            params: {
                app_id: APP_ID,
                app_key: APP_KEY,
                what: keyword?.trim() || 'developer', // Use 'developer' as default keyword
                where: location?.trim() || 'India',   // Use 'India' as default location
            },
        });

        // Log the Adzuna API response
        console.log('Adzuna API Response:', response.data);

        // Return job results to the client
        if (response.data && response.data.results) {
            return res.status(200).json(response.data.results);
        } else {
            return res.status(404).json({
                message: 'No jobs found. Please refine your search criteria.',
            });
        }
    } catch (error) {
        console.error('Error fetching jobs:', error.response?.data || error.message);

        // Specific error handling for better client responses
        if (error.response) {
            const statusCode = error.response.status;
            const errorData = error.response.data;

            if (statusCode === 401) {
                return res.status(401).json({
                    message: 'Unauthorized. Please check your API credentials.',
                });
            } else if (statusCode === 429) {
                return res.status(429).json({
                    message: 'Rate limit exceeded. Please try again later.',
                });
            } else if (statusCode === 400) {
                return res.status(400).json({
                    message: 'Bad request. Please check your query parameters.',
                    details: errorData,
                });
            }
        }

        // General error response
        return res.status(500).json({
            message: 'Failed to fetch jobs due to an unexpected error.',
            error: error.message,
        });
    }
});

module.exports = router;
