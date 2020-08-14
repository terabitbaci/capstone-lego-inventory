# capstone-lego-inventory

My Lego® Inventory was created by Teresa Bacigalupi (a Lego® Technic fan) using the following tools:
* Front-End: HTML5, CSS3, JavaScript ES6, jQuery
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, MongoDB, Mongoose
* Development Environment: Postman, Heroku, mLab, Robo 3T

## Working Prototype
You can access a working prototype of the app here: https://legoinventory.herokuapp.com/ and
## API Documentation based on Swagger 2.0
Swagger documentation here https://lego-inventory-swagger-ui.herokuapp.com/


## User Stories
This app is for two types of users; a visitor, and a logged-in user

#### Landing Page
* as a visitor
* I want to understand what I can do with this app (or sign up, or log in)
* so I can decide if I want to use it

#### Sign Up
* as a visitor
* I want to register to use this app
* so I can create a personal Lego® inventory

#### Start Building Inventory
* as a logged-in user
* I want to see instructions and begin entering my Lego sets
* so I can build my personal inventory

#### Inventory Home (Confirm Added & See Inventory)
* as a logged-in user
* I want to see my inventory with the most recent added item on the top line,
with view-filtering and action options,
and each inventory item clickable to reveal more details and provide links,
with a feature to mark a set/MOC/part as in-use (part of a permanent build),
and the ability to enter a bin number where each part is physically stored,
* so I can confirm the item was added to my inventory, have view options and
and accurate list of parts available for a build, and perform actions on my inventory

#### Show Details
* as a logged-in user
* I want to view the photo and details of each set/MOC/part,
and access links to its page (and MOC designer) on Rebrickable.com,
and link to the item on my Wishlist
* so I can learn about the item and see stats on parts and quantities,
and access links to purchase the item

#### Search
* as a logged-in user
* I want to be able to search for parts
* so I can capture the part number to add it to my inventory

#### Search Error
* as a logged-in user
* I want to know if there is an error in my search
* so I can capture the part number to add it to my inventory

#### Search Results (One page for parts, one for MOCs, one for sets)
* as a logged-in user
* I want to look for and click on the item from my search
* so I can perform an action on it

#### Search Results Action
* as a logged-in user
* I want to look for and click on the item from my search
* so I can view details of the item, add it to my inventory, or put it on my wishlist

#### Plan a Build
* as a logged-in user
* I want to enter a planned build by set or MOC number
* so I can generate build calculations

#### Build Calculation
* as a logged-in user
* I want to view the build calculations
* so I can see how many parts I have, how many parts I need
to complete the build, and add those parts to my wishlist

#### Wishlist
* as a logged-in user
* I want to view my wishlist by build
* so I can print my wishlist (File > Print), and add parts as I acquire them

#### Wishlist Item Options
* as a logged-in user
* I want to click on a Wishlist item
* so I can view its details, add the newly-acquired number of parts to my inventory,
and recalculate my build(s)


### Wireframe
Landing/Login Page | Sign Up Page
:-------------------------:|:-------------------------:
![Landing/Login Page](/github-images/wireframes/Landing-Page.png)  |  ![Sign Up Page](/github-images/wireframes/Sign-Up.png)
Inventory Page | Inventory Page with Details
![Inventory Page](/github-images/wireframes/Inventory-Home.png) | ![Inventory Page with Details](/github-images/wireframes/Show-Details.png)
Search Page | Search Error Page
![Search Page](/github-images/wireframes/Search.png) | ![Search Error Page](/github-images/wireframes/Search-Error.png)
Search Results | Search Results Action
![Search Results](/github-images/wireframes/Search-Results.png) | ![Search Results Action](/github-images/wireframes/Search-Results-Action.png)
Plan a Build | Build Calculation
![Plan a Build](/github-images/wireframes/Plan-a-Build.png) | ![Build Calculation](/github-images/wireframes/Build-Calculation.png)
Wishlist | Wishlist Options
![Wishlist](/github-images/wireframes/Wishlist.png) | ![Wishlist Options](/github-images/wireframes/Wishlist-Item-Options.png)

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


## Functionality
The app's functionality includes:
The search feature looks for the part number provided by the user (XXXXX) and possible Rebrickable number (XXXXX-1)

* Every User has the ability to create an account that stores information unique to them
* User can Add Entries, Update Entries, and Delete Entries
* User can sort entries by: Date & Type (Read, Seen, Performed)

## Business Objects (database structure)
* User (collection)
    * Username
    * Password
* Sets
    * set_num: Number entered by user; example, "42053-1"
    * set_name: Name of the set; example, "Volvo EW 160E"
    * year: Year(s) the set was active; example, "2016"
    * theme_id: Lego theme ID; example, "1"
    * num_parts: Number of parts in the set; example, "1166"
    * set_img_url: Location of photo of the set; example, "https://cdn.rebrickable.com/media/sets/42053-1.jpg"
    * set_url: Location of the set's data in the API; example, "https://rebrickable.com/sets/42053-1/volvo-ew-160e/"
    * permanent_build: A filter added by the user to indicate whether the set is part of a permanent build (1) (its parts are not available), or not (0)
    * in_wishlist: (for future release) Added to Wishlist by the user (1) or not (0)
    * storage_location: (optional to user) Location entered by user indicating where the set is kept; example, "bin 7-1"
    * loggedInUserName: The user who is logged in
    * addedToDB: Date/time the user added this set to their inventory; example, "ISODate("2019-06-12T15:31:27.084-07:00")"

* MOCs (My Original Creation)
    * moc_num: Number entered by user; example, "MOC-4096"
    * moc_name: Name of the MOC; example, "Trammel of Archimedes"
    * year: Year(s) the MOC was released; example, "2015"
    * theme_id: Lego theme ID; example, "1"
    * num_parts: Number of parts in the MOC; example, "47"
    * moc_img_url: Location of photo of the MOC; example, "https://cdn.rebrickable.com/media/mocs/moc-4096.jpg"
    * moc_url: Location of the MOC's data in the API; example, "https://rebrickable.com/mocs/MOC-4096/JKBrickworks/trammel-of-archimedes/"
    * designer_name: Credit to the designer of the MOC; example, "JKBrickworks"
    * designer_url: Location of the designer's page on the Rebrickable site; example, "https://rebrickable.com/users/JKBrickworks/mocs/"
    * permanent_build: A filter added by the user to indicate whether the MOC is part of a permanent build (1) (its parts are not available), or not (0)
    * in_wishlist: (for future release) Added to Wishlist by the user (1) or not (0)
    * storage_location: (optional to user) Location entered by user indicating where the MOC is kept; example, "middle shelf"
    * loggedInUserName: The user who is logged in
    * addedToDB: Date/time the user added this MOC to their inventory; example, "ISODate("2019-06-03T15:17:11.323-07:00")"

* Parts
    * element_id: 300226,
    * inv_part_id: 351988,
    * is_spare: "false",
    * num_sets: 512,
    * part_name: "Brick 2 x 3",
    * part_cat_id: 11,
    * part_img_url: "https://cdn.rebrickable.com/media/parts/elements/300226.jpg",
    * part_num: "3002",
    * part_url: "https://rebrickable.com/parts/3002/brick-2-x-3/",
    * part_year_from: 1969,
    * part_year_to: 2019,
    * quantity: 1,
    * set_num: "MOC-5982",
    * from_set_id: "0",
    * from_moc_id: "5d0425e3619861e096154354",
    * permanent_build: 0,
    * in_wishlist: 0,
    * storage_location: "",
    * loggedInUserName: "username",
    * addedToDB: ISODate("2019-06-14T15:55:38.353-07:00"),


## Technology
* Front-End: HTML5, CSS3, JavaScript ES6, jQuery
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, MongoDB, Mongoose
* Development Environment: Postman, Heroku, mLab, Robo 3T

## API Documentation based on Swagger 2.0
View the Swagger API documentation here https://lego-inventory-swagger-ui.herokuapp.com/

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Wishlist (from the inventory page part details);
        (1) see how many parts there are in the Wishlist, and
        (2) if there are none, have a button (Add part to Wishlist) to add the part to the Wishlist by pre-populating the form at the top of the Wishlist page, but
        (3) if there are parts in the Wishlist, click on the link to see them in the Wishlist page (button: Go to Wishlist)
* Search: to allow the user to search for sets/mocs/parts
* Plan a build: to help the user see what parts are needed to build another MOC or set


