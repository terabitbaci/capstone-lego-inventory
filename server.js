const User = require('./models/user');
const Entry = require('./models/entry');
const Set = require('./models/set');
const Moc = require('./models/moc');
const Part = require('./models/part');
const bodyParser = require('body-parser');
const request = require("request");
const config = require('./config');
const mongoose = require('mongoose');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;


// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}



app.post('/item/create', function (req, res) {
    let itemNum = req.body.itemNum;
    let itemType = req.body.itemType;
    let loggedInUserName = req.body.loggedInUserName;


    if (itemType == 'set') {
        // make request for set details
        request({
            method: 'GET',
            uri: 'https://rebrickable.com/api/v3/lego/sets/' + itemNum + '?key=4f8845c5d9212c179c08fe6f0e0d2d0c',
            gzip: true,
            data: {
                key: '4f8845c5d9212c179c08fe6f0e0d2d0c'
            },
            dataType: 'json',
        }, function (error, response, body) {
            // if the search for set details returns results
            if (Object.keys(JSON.parse(body)).length > 1) {
                // add set to the database
                Set.create({
                    set_num: JSON.parse(body).set_num,
                    name: JSON.parse(body).name,
                    year: JSON.parse(body).year,
                    theme_id: JSON.parse(body).theme_id,
                    num_parts: JSON.parse(body).num_parts,
                    set_img_url: JSON.parse(body).set_img_url,
                    set_url: JSON.parse(body).set_url,
                    loggedInUserName: loggedInUserName
                }, (err, item) => {
                    //if creating a new set details in the DB returns an error..
                    if (err) {
                        //display it
                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }
                    //if creating a new set in the DB is successfull
                    if (item) {
                        //                        console.log(JSON.parse(body));
                        // ---------------------------------------------------------------------------------------------------------------------------
                        // make request for parts related to a set
                        request({
                            method: 'GET',
                            uri: 'https://rebrickable.com/api/v3/lego/sets/' + itemNum + '/parts?key=4f8845c5d9212c179c08fe6f0e0d2d0c&page_size=1000&inc_part_details=1',
                            gzip: true,
                            data: {
                                key: '4f8845c5d9212c179c08fe6f0e0d2d0c'
                            },
                            dataType: 'json',
                        }, function (error, response, body) {
                            // add set to the database
                            // if the search for set returns results
                            if (JSON.parse(body).results.length > 1) {
                                for (setCounter = 0; setCounter < JSON.parse(body).results.length; setCounter++) {
                                    Part.create({
                                        element_id: JSON.parse(body).results[setCounter].element_id,
                                        inv_part_id: JSON.parse(body).results[setCounter].inv_part_id,
                                        is_spare: JSON.parse(body).results[setCounter].is_spare,
                                        num_sets: JSON.parse(body).results[setCounter].num_sets,
                                        part_name: JSON.parse(body).results[setCounter].part.name,
                                        part_cat_id: JSON.parse(body).results[setCounter].part.part_cat_id,
                                        part_img_url: JSON.parse(body).results[setCounter].part.part_img_url,
                                        part_num: JSON.parse(body).results[setCounter].part.part_num,
                                        part_url: JSON.parse(body).results[setCounter].part.part_url,
                                        part_year_from: JSON.parse(body).results[setCounter].part.year_from,
                                        part_year_to: JSON.parse(body).results[setCounter].part.year_to,
                                        quantity: JSON.parse(body).results[setCounter].quantity,
                                        set_num: JSON.parse(body).results[setCounter].set_num,
                                        loggedInUserName: loggedInUserName
                                    }, (err, item) => {
                                        //if creating a new part in the DB returns an error..
                                        if (err) {
                                            //display it
                                            return res.status(500).json({
                                                message: 'Internal Server Error'
                                            });
                                        }
                                        //if creating a new part in the DB is succefull
                                        if (item) {
                                            //                        return res.json(JSON.parse(body));
                                        }
                                    });
                                }
                                return res.json({
                                    'message': 'success'
                                })
                            }
                            // if there are no results...
                            else {
                                return res.status(200).json({
                                    message: 'Invalid part number'
                                });
                            }
                        });
                    }
                });
            }
            // if there are no results...
            else {
                return res.status(200).json({
                    message: 'Invalid set number'
                });
            }
        });

    } else if (itemType == 'moc') {
        // add MOC to the database
        //         make request for moc details
        request({
            method: 'GET',
            uri: 'https://rebrickable.com/api/v3/lego/mocs/' + itemNum + '?key=4f8845c5d9212c179c08fe6f0e0d2d0c',
            gzip: true,
            data: {
                key: '4f8845c5d9212c179c08fe6f0e0d2d0c'
            },
            dataType: 'json',
        }, function (error, response, body) {
            // if the search for moc details returns results
            if (Object.keys(JSON.parse(body)).length > 1) {
                // add moc to the database
                Moc.create({
                    moc_num: JSON.parse(body).set_num,
                    moc_name: JSON.parse(body).name,
                    year: JSON.parse(body).year,
                    theme_id: JSON.parse(body).theme_id,
                    num_parts: JSON.parse(body).num_parts,
                    moc_img_url: JSON.parse(body).moc_img_url,
                    moc_url: JSON.parse(body).moc_url,
                    designer_name: JSON.parse(body).designer_name,
                    designer_url: JSON.parse(body).designer_url,
                    loggedInUserName: loggedInUserName
                }, (err, item) => {
                    //if creating a new moc details in the DB returns an error..
                    if (err) {
                        //display it
                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }
                    //if creating a new moc in the DB is successfull
                    if (item) {
                        //                        console.log(JSON.parse(body));
                        // ---------------------------------------------------------------------------------------------------------------------------
                        // make request for parts related to a moc
                        request({
                            method: 'GET',
                            uri: 'https://rebrickable.com/api/v3/lego/mocs/' + itemNum + '/parts?key=4f8845c5d9212c179c08fe6f0e0d2d0c&page_size=1000&inc_part_details=1',
                            gzip: true,
                            data: {
                                key: '4f8845c5d9212c179c08fe6f0e0d2d0c'
                            },
                            dataType: 'json',
                        }, function (error, response, body) {
                            // add moc to the database
                            // if the search for moc returns results
                            if (JSON.parse(body).results.length > 1) {
                                for (setCounter = 0; setCounter < JSON.parse(body).results.length; setCounter++) {
                                    Part.create({
                                        element_id: JSON.parse(body).results[setCounter].element_id,
                                        inv_part_id: JSON.parse(body).results[setCounter].inv_part_id,
                                        is_spare: JSON.parse(body).results[setCounter].is_spare,
                                        num_sets: JSON.parse(body).results[setCounter].num_sets,
                                        part_name: JSON.parse(body).results[setCounter].part.name,
                                        part_cat_id: JSON.parse(body).results[setCounter].part.part_cat_id,
                                        part_img_url: JSON.parse(body).results[setCounter].part.part_img_url,
                                        part_num: JSON.parse(body).results[setCounter].part.part_num,
                                        part_url: JSON.parse(body).results[setCounter].part.part_url,
                                        part_year_from: JSON.parse(body).results[setCounter].part.year_from,
                                        part_year_to: JSON.parse(body).results[setCounter].part.year_to,
                                        quantity: JSON.parse(body).results[setCounter].quantity,
                                        set_num: JSON.parse(body).results[setCounter].set_num,
                                        loggedInUserName: loggedInUserName
                                    }, (err, item) => {
                                        //if creating a new part in the DB returns an error..
                                        if (err) {
                                            //display it
                                            return res.status(500).json({
                                                message: 'Internal Server Error'
                                            });
                                        }
                                        //if creating a new part in the DB is succefull
                                        if (item) {
                                            //                        return res.json(JSON.parse(body));
                                        }
                                    });
                                }
                                return res.json({
                                    'message': 'success'
                                })
                            }
                            // if there are no results...
                            else {
                                return res.status(200).json({
                                    message: 'Invalid part number'
                                });
                            }
                        });
                    }
                });
            }
            // if there are no results...
            else {
                return res.status(200).json({
                    message: 'Invalid MOC number'
                });
            }
        });

    } else if (itemType == 'part') {
        request({
            method: 'GET',
            uri: 'https://rebrickable.com/api/v3/lego/parts/' + itemNum + '?key=4f8845c5d9212c179c08fe6f0e0d2d0c',
            gzip: true,
            data: {
                key: '4f8845c5d9212c179c08fe6f0e0d2d0c'
            },
            dataType: 'json',
        }, function (error, response, body) {
            // if the search for part returns results
            if (Object.keys(JSON.parse(body)).length > 1) {
                // add part to the database
                Part.create({
                    element_id: 0,
                    inv_part_id: 0,
                    is_spare: 0,
                    num_sets: 0,
                    part_name: JSON.parse(body).name,
                    part_cat_id: JSON.parse(body).part_cat_id,
                    part_img_url: JSON.parse(body).part_img_url,
                    part_num: JSON.parse(body).part_num,
                    part_url: JSON.parse(body).part_url,
                    part_year_from: JSON.parse(body).year_from,
                    part_year_to: JSON.parse(body).year_to,
                    quantity: 0,
                    set_num: 0,
                    loggedInUserName: loggedInUserName
                }, (err, item) => {
                    //if creating a new part in the DB returns an error..
                    if (err) {
                        //display it
                        return res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }
                    //if creating a new part in the DB is succefull
                    if (item) {
                        return res.json(JSON.parse(body));
                        //                        return res.json({
                        //                            'message': 'success'
                        //                        })
                    }
                });
            }
            // if there are no results...
            else {
                return res.status(200).json({
                    message: 'Invalid part number'
                });
            }
        });
    }
});

//app.get('/lego/:code', function (req, res) {
//    var responseData;
//    request({
//        method: 'GET',
//        uri: 'https://rebrickable.com/api/v3/lego/sets/' + req.params.code + '/parts?key=4f8845c5d9212c179c08fe6f0e0d2d0c',
//        gzip: true,
//        data: {
//            key: '4f8845c5d9212c179c08fe6f0e0d2d0c'
//        },
//        dataType: 'json',
//    }, function (error, response, body) {
//        // body is the decompressed response body
//        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
//        console.log('the decoded data is: ' + body);
//        res.json(body);
//    });
//
//});

// ---------------USER ENDPOINTS-------------------------------------
// POST -----------------------------------
// creating a new user
app.post('/users/create', (req, res) => {

    //take the name, username and the password from the ajax api call
    let username = req.body.username;
    let password = req.body.password;

    //exclude extra spaces from the username and password
    username = username.trim();
    password = password.trim();

    //create an encryption key
    bcrypt.genSalt(10, (err, salt) => {

        //if creating the key returns an error...
        if (err) {

            //display it
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        //using the encryption key above generate an encrypted pasword
        bcrypt.hash(password, salt, (err, hash) => {

            //if creating the ncrypted pasword returns an error..
            if (err) {

                //display it
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            //using the mongoose DB schema, connect to the database and create the new user
            User.create({
                username,
                password: hash,
            }, (err, item) => {

                //if creating a new user in the DB returns an error..
                if (err) {
                    //display it
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                //if creating a new user in the DB is succefull
                if (item) {

                    //display the new user
                    return res.json(item);
                }
            });
        });
    });
});

// log in a user
app.post('/users/login', function (req, res) {

    //take the username and the password from the ajax api call
    const username = req.body.username;
    const password = req.body.password;

    //using the mongoose DB schema, connect to the database and the user with the same username as above
    User.findOne({
        username: username
    }, function (err, items) {

        //if the there is an error connecting to the DB
        if (err) {

            //display it
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        // if there are no users with that username
        if (!items) {
            //display it
            return res.status(401).json({
                message: "Not found!"
            });
        }
        //if the username is found
        else {

            //try to validate the password
            items.validatePassword(password, function (err, isValid) {

                //if the connection to the DB to validate the password is not working
                if (err) {

                    //display error
                    console.log('Could not connect to the DB to validate the password.');
                }

                //if the password is not valid
                if (!isValid) {

                    //display error
                    return res.status(401).json({
                        message: "Password Invalid"
                    });
                }
                //if the password is valid
                else {
                    //return the logged in user
                    console.log(`User \`${username}\` logged in.`);
                    return res.json(items);
                }
            });
        };
    });
});


// -------------entry ENDPOINTS------------------------------------------------
// POST -----------------------------------------
// creating a new Entry
app.post('/entry/create', (req, res) => {
    let entryType = req.body.entryType;
    let inputDate = req.body.inputDate;
    let inputPlay = req.body.inputPlay;
    let inputAuthor = req.body.inputAuthor;
    let inputRole = req.body.inputRole;
    let inputCo = req.body.inputCo;
    let inputLocation = req.body.inputLocation;
    let inputNotes = req.body.inputNotes;
    let loggedInUserName = req.body.loggedInUserName;

    Entry.create({
        entryType,
        inputDate,
        inputPlay,
        inputAuthor,
        inputRole,
        inputCo,
        inputLocation,
        inputNotes,
        loggedInUserName
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});

// PUT --------------------------------------
app.put('/entry/:id', function (req, res) {
    let toUpdate = {};
    //    let updateableFields = ['achieveWhat', 'achieveHow', 'achieveWhen', 'achieveWhy']; //<--Marius? 'entryType
    let updateableFields = ['entryType', 'inputDate', 'inputPlay', 'inputAuthor', 'inputRole', 'inputCo', 'inputLocation', 'inputNotes', 'loggedInUserName'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    //    console.log(toUpdate);
    Entry
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function (achievement) {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// GET ------------------------------------
// accessing all of a user's entries
app.get('/entry-date/:user', function (req, res) {

    Entry
        .find()
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-read/:user', function (req, res) {

    Entry
        .find({
            "entryType": "read"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-seen/:user', function (req, res) {

    Entry
        .find({
            "entryType": "seen"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});
app.get('/entry-performed/:user', function (req, res) {

    Entry
        .find({
            "entryType": "performed"
        })
        .sort('inputDate')
        .then(function (entries) {
            let entriesOutput = [];
            entries.map(function (entry) {
                if (entry.loggedInUserName == req.params.user) {
                    entriesOutput.push(entry);
                }
            });
            res.json({
                entriesOutput
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// accessing a single achievement by id
app.get('/entry/:id', function (req, res) {
    Entry
        .findById(req.params.id).exec().then(function (entry) {
            return res.json(entry);
        })
        .catch(function (entries) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// DELETE ----------------------------------------
// deleting an achievement by id
app.delete('/entry/:id', function (req, res) {
    Entry.findByIdAndRemove(req.params.id).exec().then(function (entry) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
