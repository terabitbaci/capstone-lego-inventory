"use strict";

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const setSchema = new mongoose.Schema({
    set_num: {
        type: String,
        required: false
    }

});

const Set = mongoose.model('Set', setSchema);

module.exports = Set;
