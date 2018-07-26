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

// also

as a logged-in user (code)
I want to mark (toggle) a set/MOC/parts as in-use (part of a permanent build)
so I can view what is left in my inventory, and have an accurate list of
parts available for a build

// also

as a logged-in user (code)
I want to enter a bin number for each part
so I can maintain a home storage system for my Legos

// also

as a logged-in user (api)
I want to access the details of any item in my inventory
so I can view photos and information on the item

// Search
as a logged-in user (api)
// https://rebrickable.com/api/v3/swagger/?key=4f8845c5d9212c179c08fe6f0e0d2d0c#!/lego/lego_parts_list
I want to be able to search for parts
so I can capture the part number to add it to my inventory

// Search Results
as a logged-in user
I want to look for and click on the part from my search
so I can add the item


// new

as a logged-in user (code - comparison) (enter set/MOC to build; report on xxxx/xxxxx have, xxx needed; display checklist)
I want to enter a planned build to see what Lego parts I still need in order to do the build
so I can see what parts to buy (another page with a table of needed parts)

as a logged-in user (code)
I want to generate a checklist of needed parts for my planned build
so I can check parts off as I purchase/collect them

as a logged-in user (code)
I want to add parts to my inventory as I check them off my checklist of needed parts
so I can maintain an accurate inventory as I prepare for my planned build

as a logged-in user (code)
I want to create a wish list of sets/MOCs/parts
so I have a master wish list to work from

as a logged-in user (code)
I want to add sets/MOCs/parts to my inventory as I check them off my wish list
so I can maintain an accurate inventory of my Legos


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
