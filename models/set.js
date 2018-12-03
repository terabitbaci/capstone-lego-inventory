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
    loggedInUserName: {
        type: String,
        required: false
    }

});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
