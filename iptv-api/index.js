const express = require('express');
const M3U8FileParser = require('m3u8-file-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/iptv/country', async (req, res) => {
    const url = "/iptv/index.country.m3u";
    const searchTerm = req.query.search;
    const groupSearchTerm = req.query.group;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 32;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const reader = new M3U8FileParser();
        reader.read(data);
        let result = reader.getResult();

        // Filter the result based on the search term
        if (searchTerm || groupSearchTerm) {
            if (searchTerm) {
                console.log(`Searching ${searchTerm}`);
                result.segments = result.segments?.filter(item =>
                    item.inf?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            if (groupSearchTerm) {
                console.log(`Group Searching ${groupSearchTerm}`);
                result.segments = result.segments?.filter(item =>
                    item.inf?.groupTitle?.toLowerCase().includes(groupSearchTerm.toLowerCase()));
            }
        }

        // Calculate pagination information
        const totalResults = result.segments?.length;
        const totalPages = Math.ceil(totalResults / pageSize);
        const hasNextPage = page < totalPages;

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        result.segments = result.segments?.slice(startIndex, endIndex);

        res.json({
            currentPage: page,
            totalPages,
            hasNextPage,
            totalResults,
            results: result.segments
        });
    } catch (error) {
        console.error(`Error fetching M3U file: ${error}`);
        res.status(500).send('An error occurred while fetching the M3U file.');
    }
});

app.get('/iptv/country', async (req, res) => {
    const url = "/iptv/index.country.m3u";
    const searchTerm = req.query.search;
    const groupSearchTerm = req.query.group;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 32;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const reader = new M3U8FileParser();
        reader.read(data);
        let result = reader.getResult();

        // Filter the result based on the search term
        if (searchTerm || groupSearchTerm) {
            if (searchTerm) {
                console.log(`Searching ${searchTerm}`);
                result.segments = result.segments?.filter(item =>
                    item.inf?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            if (groupSearchTerm) {
                console.log(`Group Searching ${groupSearchTerm}`);
                result.segments = result.segments?.filter(item =>
                    item.inf?.groupTitle?.toLowerCase().includes(groupSearchTerm.toLowerCase()));
            }
        }

        // Calculate pagination information
        const totalResults = result.segments?.length;
        const totalPages = Math.ceil(totalResults / pageSize);
        const hasNextPage = page < totalPages;

        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        result.segments = result.segments?.slice(startIndex, endIndex);

        res.json({
            currentPage: page,
            totalPages,
            hasNextPage,
            totalResults,
            results: result.segments
        });
    } catch (error) {
        console.error(`Error fetching M3U file: ${error}`);
        res.status(500).send('An error occurred while fetching the M3U file.');
    }
});

app.get('/iptv/countries', async (req, res) => {
    const url = "/iptv/index.country.m3u";
    try {
        const response = await axios.get(url);
        const data = response.data;

        const reader = new M3U8FileParser();
        reader.read(data);
        let result = reader.getResult();

        // Create a Set to store unique group titles
        let groupTitles = new Set();

        // Iterate over segments and add group titles to the Set
        result.segments?.forEach(segment => {
            segment.inf?.groupTitle && groupTitles.add(segment.inf.groupTitle);
        });

        // Convert the Set back to an array
        let uniqueGroupTitles = Array.from(groupTitles);

        // Return the unique group titles
        res.json(uniqueGroupTitles);
    } catch (error) {
        console.error(`Error fetching M3U file: ${error}`);
        res.status(500).send('An error occurred while fetching the M3U file.');
    }
});

app.get('/iptv/categories', async (req, res) => {
    const url = "/iptv/index.nsfw.m3u";
    try {
        const response = await axios.get(url);
        const data = response.data;

        const reader = new M3U8FileParser();
        reader.read(data);
        let result = reader.getResult();

        // Create a Set to store unique group titles
        let Categories = new Set();

        // Iterate over segments and add group titles to the Set
        result.segments?.forEach(segment => {
            segment.inf?.groupTitle && Categories.add(segment.inf.groupTitle);
        });

        // Convert the Set back to an array
        let uniqueCategories = Array.from(Categories);

        // Return the unique group titles
        res.json(uniqueCategories);
    } catch (error) {
        console.error(`Error fetching M3U file: ${error}`);
        res.status(500).send('An error occurred while fetching the M3U file.');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
