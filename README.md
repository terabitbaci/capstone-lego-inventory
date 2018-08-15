# capstone-lego-inventory

The Shakespeare Passport app is designed for Theatrical Performers, Theatre Goers, and Theatre enthusiast alike. It allows a User to compile a list of plays by SEEN, PERFORMED, and READ tracking date and location.

## Screenshots

Home Page View | Login Page View #2
:-------------------------:|:-------------------------:
![Home Page](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/home-page.jpg)  |  ![Login Page](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/login.jpg)
User Dashboard | Seen Entry
![User Dashboard](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/user-dashboard.jpg) | ![Seen Entry](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/seen-entry.jpg)
Add Entry  | Edit Entry
![Add Entry](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/add-entry.jpg) | ![Edit Entry](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/edit-entry.jpg)
Delete Entry |
![Delete Entry](https://github.com/KatiLong/shakespeare-passport-node-capstone/blob/master/github-images/delete-entry.jpg) |

## User Cases
This app is for three types of users:


// update the use cases in the sticky notes at the top of each wireframe

// Landing Page (code)
as a visitor
I want to understand what I can do with this app (or sign up, or log in)
so I can decide if I want to use it

// Sign Up (code)
as a visitor
I want to register to use this app
so I can create a personal Lego® inventory

// Start Building Inventory (api)
// https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_sets_parts_list
as a logged-in user
I want to see instructions and begin entering my Lego sets
so I can build my personal inventory

// Inventory Home (Confirm Added & See Inventory) (api) (add magnifying glass)
// https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_sets_parts_list
as a logged-in user
I want to see my inventory with the most recent added item on the top line,
with view-filtering, action options, and each inventory item clickable
so I can confirm the item was added to my inventory, and to view my inventory
with view-filtering and action options, and each inventory item clickable
to reveal more details and provide links
so I can confirm the item was added to my inventory, and to view and
perform actions on my inventory

// also

as a logged-in user (code)
I want to mark (toggled lock icon) a set/MOC/parts as in-use (part of a permanent build)
so I can view what is left in my inventory, and have an accurate list of
parts available for a build

// also

as a logged-in user (code)
I want to enter a bin number for each part
so I can maintain a home storage system for my Legos

// Show Details (api)
as a logged-in user
I want to view the photo and details of each set/MOC/part,
and access links to its page (and MOC designer) on Rebrickable.com,
and link to the item on my Wishlist
so I can learn about the item and see stats on parts and quantities

// Search
as a logged-in user (api)
// https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_parts_list
I want to be able to search for parts
so I can capture the part number to add it to my inventory

// Search Results (One page for parts, one for MOCs, one for sets)
as a logged-in user
I want to look for and click on the item from my search
so I can perform an action on it

// Search Results Action
as a logged-in user
I want to look for and click on the item from my search
so I can view details of the item, add it to my inventory, or put it on my wishlist

// Plan a Build
as a logged-in user
I want to enter a planned build by set or MOC number
so I can generate build calculations

// Build Calculation
as a logged-in user
I want to view the build calculations
so I can see how many parts I have, how many parts I need
to complete the build, and add those parts to my wishlist

// (code - comparison; loop through the initial code and secondary code,
and figure out which are common to both. Cross reference: what you have vs. what is necessary)


// Wishlist
as a logged-in user
I want to view my wishlist by build
so I can print my wishlist (File > Print), and add parts as I acquire them


// Wishlist Item Options
as a logged-in user
I want to click on a Wishlist item
so I can view its details, add the newly-acquired number of parts to my inventory,
and recalculate my build(s)


// search for colors (https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_parts_colors_list)


//About
// keep blank for now; tools go to README page; trademark & Rebrickable in footers;
// icons stay for now
// Login by Mint Shirt from the Noun Project
as a visitor
I want to access the About page
so I can learn what/who is behind this app

### UI Flow
![UI Flow handwritten draft](https://github.com/KatiLong/node-capstone/blob/master/github-images/node-capstone-user-flow.jpg)

### Wireframe _main
![Wireframe _Main](https://github.com/KatiLong/node-capstone/blob/master/github-images/wireframe-v1.jpg)

## Working Prototype
You can access a working prototype of the app here: https://legoinventory.herokuapp.com/

## Functionality
The app's functionality includes:
* Every User has the ability to create an account that stores information unique to them
* User can Add Entries, Update Entries, and Delete Entries
* User can sort entries by: Date & Type (Read, Seen, Performed)

## Business Objects (database structure)
* User (collection)
    * Username
    * Password
* Lego Item (collection) (unique database info on items)
    * number (Lego)
    * number (Rebrickable)
    * type (set/MOC/part)
    * image URL (set/MOC/part)
    * name
    * username of owner
    * source of part (sets the part is found in)
    * number of parts (in set/MOC)
    * years offered / year design was released
    ** designer of MOC
    ** designer's website
    * quantity in Wishlist
    * quantity of parts in a set/MOC
    * username
* Inventory (collection) (user-specific inventory)
    * number (Lego)
    * number (Rebrickable)
    * quantity (in inventory)
    * name
    * status (y/n permanent build)
    * quantity available
    * bin (customer organization number)
    * username
    * 'in your sets' calculation ("good to have" feature)(from Show Details wireframe)
    * type (set, MOC or part)
* Wishlist (collection) (user-specific wishlist)
    * number (Lego)
    * number (Rebrickable)
    * quantity (in Wishlist)
    * name
    * username
    * 'in these sets/MOCs' calculation
    * type (set, MOC or part)

## Technology
* Front-End: HTML5 | CSS3 | JavaScript ES6 | jQuery
* Back-End: Node.js | Express.js | Mocha | Chai | RESTful API Endpoints | MongoDB | Mongoose

// Heroku, mLab, Robo 3T

## Responsive
App is strongly built to be usuable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Google Maps integrated to view all entries by location
* Featured Theaters of the World Section
