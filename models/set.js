"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const setSchema = new mongoose.Schema({
    element_id: {
        type: String,
        required: false
    },
    inv_part_id: {
        type: String,
        required: false
    },
    is_spare: {
        type: String,
        required: false
    },
    num_sets: {
        type: String,
        required: false
    },
    part_name: {
        type: String,
        required: false
    },
    part_cat_id: {
        type: String,
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
        type: String,
        required: false
    },
    part_year_to: {
        type: String,
        required: false
    },
    quantity: {
        type: String,
        required: false
    },
    set_num: {
        type: String,
        required: false
    }

});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
