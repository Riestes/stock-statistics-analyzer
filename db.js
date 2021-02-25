const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');

const results = [];

// Use filesystem and csv-parser to parse local csv file
// and push to results array
fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    });

// For CORS Policy
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// GET request
app.get('/', (req, res) => {
    res.send(results);
});

// Run at localhost 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});