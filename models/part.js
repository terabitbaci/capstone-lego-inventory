"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const partSchema = new mongoose.Schema({
    element_id: {
        type: Number,
        required: false
    },
    inv_part_id: {
        type: Number,
        required: false
    },
    is_spare: {
        type: String,
        required: false
    },
    num_sets: {
        type: Number,
        required: false
    },
    part_name: {
        type: String,
        required: false
    },
    part_cat_id: {
        type: Number,
        required: false
    },
    part_img_url: {
        type: String,
        required: false
    },
    part_num: {
        type: String,
        required: false
    },
    part_url: {
        type: String,
        required: false
    },
    part_year_from: {
        type: Number,
        required: false
    },
    part_year_to: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    set_num: {
        type: String,
        required: false
    },
    permanent_build: {
        type: Number,
        required: false
    },
    in_wishlist: {
        type: Number,
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

const Part = mongoose.model('Part', partSchema);

module.exports = Part;
