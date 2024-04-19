const express = require('express');

const dateRoute = express.Router();

dateRoute.get('/', (req, res) => {
    try {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleString('en-US', { timeZone: 'UTC' });
        res.status(200).json({servertime: formattedTime});
    } catch (error) {
      res.status(500).json({ message: 'Server Side Error' });
    }
});

module.exports = dateRoute;