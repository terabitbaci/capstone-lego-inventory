"use strict";

const mongoose = require('mongoose');

const mocSchema = new mongoose.Schema({
    moc_num: {
        type: String,
        required: false
    },
    moc_name: {
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
    moc_img_url: {
        type: String,
        required: false
    },
    moc_url: {
        type: String,
        required: false
    },
    designer_name: {
        type: String,
        required: false
    },
    designer_url: {
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

const Moc = mongoose.model('Moc', mocSchema);

module.exports = Moc;
