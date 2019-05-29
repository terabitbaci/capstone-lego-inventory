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


update the use cases in the sticky notes at the top of each wireframe

Landing Page (code)
as a visitor
I want to understand what I can do with this app (or sign up, or log in)
so I can decide if I want to use it

Sign Up (code)
as a visitor
I want to register to use this app
so I can create a personal Lego® inventory

Start Building Inventory (api)
https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_sets_parts_list
as a logged-in user
I want to see instructions and begin entering my Lego sets
so I can build my personal inventory

Inventory Home (Confirm Added & See Inventory) (api) (add magnifying glass)
https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_sets_parts_list
as a logged-in user
I want to see my inventory with the most recent added item on the top line,
with view-filtering and action options,
and each inventory item clickable to reveal more details and provide links,
with a feature to mark a set/MOC/part as in-use (part of a permanent build),
and the ability to enter a bin number where each part is physically stored,
so I can confirm the item was added to my inventory, have view options and
and accurate list of parts available for a build, and perform actions on my inventory

Show Details (api)
as a logged-in user
I want to view the photo and details of each set/MOC/part,
and access links to its page (and MOC designer) on Rebrickable.com,
and link to the item on my Wishlist
so I can learn about the item and see stats on parts and quantities,
and access links to purchase the item

Search
as a logged-in user (api)
// https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_parts_list
I want to be able to search for parts
so I can capture the part number to add it to my inventory

Search Error
as a logged-in user
I want to know if there is an error in my search
so I can capture the part number to add it to my inventory

Search Results (One page for parts, one for MOCs, one for sets)
as a logged-in user
I want to look for and click on the item from my search
so I can perform an action on it

Search Results Action
as a logged-in user
I want to look for and click on the item from my search
so I can view details of the item, add it to my inventory, or put it on my wishlist

Plan a Build
as a logged-in user
I want to enter a planned build by set or MOC number
so I can generate build calculations

Build Calculation
as a logged-in user
I want to view the build calculations
so I can see how many parts I have, how many parts I need
to complete the build, and add those parts to my wishlist

(code - comparison; loop through the initial code and secondary code,
and figure out which are common to both. Cross reference: what you have vs. what is necessary)


Wishlist
as a logged-in user
I want to view my wishlist by build
so I can print my wishlist (File > Print), and add parts as I acquire them


Wishlist Item Options
as a logged-in user
I want to click on a Wishlist item
so I can view its details, add the newly-acquired number of parts to my inventory,
and recalculate my build(s)


search for colors (https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_parts_colors_list)


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
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Part details functionality to-do list:
    * (done 01/07/19) make parts permanent build
    * (done 12/28/18) total in inventory
    * (done 01/09/19) available (total minus the number in permanent builds)
    * (done 01/14/19) in your sets (example: 10220, 10356, 10646)
    * (done 12/21/18) appears in years
    * (done 01/30/19) Wishlist (from the inventory page part details);
            (1) see how many parts there are in the Wishlist, and
            (2) if there none, have a button (Add part to Wishlist) to add the part to the Wishlist by pre-populating the form at the top of the Wishlist page, but
            (3) if there are parts in the Wishlist, click on the link to see them in the Wishlist page (button: Go to Wishlist)
    * (done 01/25/19) delete from inventory
    * (done 01/30/19) bin/storage location (entered by user)

* Set and mocs functionality to do list
    * filter out the part inventory details to match the sets and mocs
    * duplicate "showPartsInInventory" function
    * duplicate "/inventory-part/show-aggregate/" api endpoint
    * duplicate "/inventory-part/show-details/" api endpoint
    * update "getTotalInInventory" function to support sets and mocs
    * duplicate "getPartsToDelete" function to support sets and mocs
    * ignore "getInYourSets" function to support sets and mocs


DONE: 03/15/2019
1 inside the trigger " $(".add-to-inventory-form").submit(function (event) { " duplicate
- showPartsInInventory(loggedInUserName);
to create:
- showSetsInInventory(loggedInUserName); start from 226 and 456
- showMocsInInventory(loggedInUserName);

DONE 03/20/2019
In the client.js update the following part functionalities to work with the mocs and sets
* '/inventory-part/update-permanent-build',
* '/inventory-part/add-storage-bin',
* '/inventory-part/delete-part-by-id',

Inventory Page Review April 21, 2019
* (done)Add bin location to a part is successful, but closes the details table
* (done)Filter out permanent builds removes the locked part, but the details for that part remain (if was already open)
* Deleting a set/moc does not also delete their respective parts (server)
* Show message when no sets/mocs/parts are viewable because of filtering
* (done)Show message describing what filtering is present
* (done)Remove the message "hide" (during filtering for permanent builds
* (done)Remove the message "see" (during filtering)
* Locking a part with filtering out permanent builds does not work (makes all permanent builds visible) (server)

DONE 05/07/2019
Data flow testing results
- parts
    - parts lock works but is not refreshing showing the locked part
    - check duplicated triggers
- sets
    - sets not diplaying properly when the page loads

DONE 05/15/2019
Delete parts related to a set or moc
- when deleting fewer sets or mocs than the maximum, find unique parts and delete them instead of decreasing the quantity of each

