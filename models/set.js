"use strict";

const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    set_num: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: false
    },
    theme_id: {
        type: String,
        required: false
    },
    num_parts: {
        type: String,
        required: false
    },
    set_img_url: {
        type: String,
        required: false
    },
    set_url: {
        type: String,
        required: false
    },
    permanent_build: {
        type: String,
        required: false
    },
    in_wishlist: {
        type: String,
        required: false
    },
    storage_location: {
        type: String,
        required: false
    },
    loggedInUserName: {
        type: String,
        required: false
    },
    addedToDB: {
        type: Date,
        default: Date.now
    }

});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
