var router = require('express').Router();
var mongoose = require('mongoose');
var request = require('request');
var Q = require("q");

var DeprecatedItem = require('../models/depItem.js');

/**
* Query success, handle the result
*/
function handleResult(data, res) {
    if(!data || data.length == 0){
        // No item found with this Filter
        var error = new Error();
        error.message = "No deprecated item found at all.";
        res.status(404).json(error);
    } else {
        res.json(data);
    }
}

/**
* Query failed, handle the error
*/
function handleError(err, res) {
    if(err.name === 'CastError') {
        res.status(400).json(err);
    } else {
        res.status(500).json(err);
    }
}

/* 
* GET all the deprecated items
* @return all the deprecated items
*/
router.get(
    '/deprecated',
    // Callback for the 'get user trips route'
    function(req, res, next) {
        Q(
            DeprecatedItem
            .find(
                // No filter
                {},
                // Projection for query, all but not 0 flagged
                { __v:0 }
            )
            .lean()
        )
        .then(function(data){
            handleResult(data, res);
        })
        .catch(function(err){
            handleError(err, res);
        });
    }
);

/* 
* GET a specific deprecated item
* @return the deprecated item
*/
router.get(
    '/deprecated/:id',
    // Callback for the 'get specific trip route'
    function(req, res, next) {
        Q(
            DeprecatedItem
            .find(
                // Filter on the userId for query
                { _id: req.params.id},
                // Projection for query, all but not 0 flagged
                { __v:0 }
            )
            .lean()
        )
        .then(function(data){
            handleResult(data, res);
        })
        .catch(function(err){
            handleError(err, res);
        });
    }
);

/*
* POST a new deprecated
* @return a specific deprecated item content
*/
router.post(
    '/deprecated',
    function(req, res, next) {
        var requestBody = req.body;
        console.log(requestBody);
        requestBody.deprecation_date = new Date(requestBody.deprecation_date);
        requestBody.unusable_date = new Date(requestBody.unusable_date);
        // Create the deprecated item
        Q(
            DeprecatedItem
            .create(
                // Use this object to create
                requestBody
            )
        )
        .then(function(data){
            handleResult(data, res);
        })
        .catch(function(err){
            handleError(err, res);
        });
    }
);

/*
* DELETA a specific deprecated item
* @return a specific trip content
*/
router.delete(
    '/deprecated/:id',
    // Callback for the 'delete a deprecated item route'
    function(req, res, next) {
        Q(
            DeprecatedItem
            .findOneAndRemove(
                // Filter the deprecated item to delete by id 
                { _id : req.params.id }
            )
            .lean()
        )
        .then(function(data){
            handleResult(data, res);
        })
        .catch(function(err){
            handleError(err, res);
        });
    }
);

module.exports = router;