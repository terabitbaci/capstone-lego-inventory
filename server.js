const User = require('./models/user');
const Entry = require('./models/entry');
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
    let rebrickableUri = 'https://rebrickable.com/api/v3/lego/sets/' + itemNum + '/parts?key=4f8845c5d9212c179c08fe6f0e0d2d0c';
    if (itemType == 'part') {
        rebrickableUri = 'https://rebrickable.com/api/v3/lego/parts/' + itemNum + '?key=4f8845c5d9212c179c08fe6f0e0d2d0c';
    } else if (itemType == 'moc') {
        rebrickableUri = 'https://rebrickable.com/api/v3/lego/mocs/' + itemNum + '/parts?key=4f8845c5d9212c179c08fe6f0e0d2d0c';
    }
    request({
        method: 'GET',
        uri: rebrickableUri,
        gzip: true,
        data: {
            key: '4f8845c5d9212c179c08fe6f0e0d2d0c'
        },
        dataType: 'json',
    }, function (error, response, body) {

        // save the api results into the database
        //                    * Lego Item(collection)(unique Lego elements saved in the database, and used to make inventories and Wishlists; these items don 't belong to anybody) *
        //                        number(Lego) *
        //                        number(Rebrickable) *
        //                        type(set / MOC / part) *
        //                        image URL to Rebrickable set / MOC / part *
        //                        name *
        //                        username of owner *
        //                        source of part(sets the part is found in ) *
        //                        number of parts( in set / MOC) *
        //                        years offered / year design was released *
        //                        designer of MOC *
        //                        designer 's website *
        //                        quantity in Wishlist *
        //                        quantity of parts in a set / MOC *
        //                        username *

        //                     Inventory(collection)(user - specific inventory) *
        //                        number(Lego) *
        //                        number(Rebrickable) *
        //                        quantity( in inventory) *
        //                        name *
        //                        status(y / n permanent build) *
        //                        quantity available *
        //                        bin(customer organization number) *
        //                        username *
        //                        'in your sets'
        //                        calculation("good to have"
        //                            feature)(from Show Details wireframe) *
        //                        type(set, MOC or part) *

        //                      Wishlist(collection)(user - specific wishlist) *
        //                        number(Lego) *
        //                        number(Rebrickable) *
        //                        quantity( in Wishlist) *
        //                        name *
        //                        username *
        //                        'in these sets/MOCs'
        //                        calculation *
        //                        type(set, MOC or part)

        res.json(JSON.parse(body));
        if (itemType == 'set') {
            // add set to the database
        } else if (itemType == 'moc') {
            // add MOC to the database
        } else if (itemType == 'part') {
            // add part to the database
        }
    });

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
