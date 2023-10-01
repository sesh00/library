const express = require('express');
const router = express.Router();

module.exports = (libraryData) => {
    router.get('/', function(req, res, next) {
        res.render('readers', { borrowers: libraryData.borrowers });

    });

    return router;
};
