# capstone-lego-inventory

My Lego® Inventory was created by Teresa Bacigalupi (a Lego® Technic fan) using the following tools:
HTML, Node, Robo 3T, CSS, Heroku, JavaScript, mLab

## Screenshots

Landing/Login Page | Sign Up Page
:-------------------------:|:-------------------------:
![Landing Page](/github-images/login-page.png)  |  ![Sign Up Page](/github-images/signup-page.png)
Inventory Page - View 1 | Inventory Page - View 2
![Inventory Page View 1](/github-images/inventory-page-1.png) | ![Inventory Page View 2](/github-images/inventory-page-2.png)
Inventory Page - Part Details | Inventory Page - MOC Details
![Inventory Page - Part Details](/github-images/inventory-part-detail.png) | ![Inventory Page - MOC Details](/github-images/inventory-MOC-detail.png)
Inventory Page - Set Details | Planned Build and Calculation Views
![Inventory Page - Part Details](/github-images/inventory-set-detail.png) | ![Inventory Page - Planned Build and Calculation Views](/github-images/build-plan-and-calculation-views.png)
Search Views | Wishlist Page
![Inventory Page - Part Details](/github-images/search-views-1-and-2.png) | ![Wishlist Page](/github-images/wishlist.png)


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
with view-filtering and action options,
and each inventory item clickable to reveal more details and provide links,
with a feature to mark a set/MOC/part as in-use (part of a permanent build),
and the ability to enter a bin number where each part is physically stored,
so I can confirm the item was added to my inventory, have view options and
and accurate list of parts available for a build, and perform actions on my inventory

// Show Details (api)
as a logged-in user
I want to view the photo and details of each set/MOC/part,
and access links to its page (and MOC designer) on Rebrickable.com,
and link to the item on my Wishlist
so I can learn about the item and see stats on parts and quantities,
and access links to purchase the item

// Search
as a logged-in user (api)
// https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_parts_list
I want to be able to search for parts
so I can capture the part number to add it to my inventory

// Search Error
as a logged-in user
I want to know if there is an error in my search
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
Search feature looks for user's number (XXXXX) and possible Rebrickable number (XXXXX-1)

* Every User has the ability to create an account that stores information unique to them
* User can Add Entries, Update Entries, and Delete Entries
* User can sort entries by: Date & Type (Read, Seen, Performed)

## Business Objects (database structure)
* User (collection)
    * Username
    * Password
* Lego Item (collection) (unique Lego elements saved in the database, and used to make inventories and Wishlists; these items don't belong to anybody)
    * number (Lego)
    * number (Rebrickable)
    * type (set/MOC/part)
    * image URL to Rebrickable set/MOC/part
    * name
    * username of owner
    * source of part (sets the part is found in)
    * number of parts (in set/MOC)
    * years offered / year design was released
    * designer of MOC
    * designer's website
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
*
*
