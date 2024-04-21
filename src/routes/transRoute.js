const express = require('express');
const opencc = require('node-opencc');

const transRoute = express.Router();

transRoute.get('/ttos', (req, res) => {
    try {
        const query = req.query;
        const simplified = opencc.traditionalToSimplified(query.text);
        res.status(200).json({ text: simplified});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Side Error' });
    }
});

transRoute.get('/stot', (req, res) => {
    try {
        const query = req.query;
        const traditional = opencc.simplifiedToTraditional(query.text);
        res.status(200).json({ text: traditional});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Side Error' });
    }
});

module.exports = transRoute;
