const express = require('express');
const router = require('express').Router();
const morgan = require('morgan');

const {
    getAllTours,
    getSingleTour,
    addNewTour,
    deleteATour,
    updateTour,
    aliasTopTours
} = require('../controllers/tour.controller');

router.use(express.json());

router.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Add middle ware for post req to check body have name and price
router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(addNewTour);
router.route('/:id').get(getSingleTour).delete(deleteATour).put(updateTour);

module.exports = router;
