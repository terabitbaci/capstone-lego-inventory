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

// Landing Page
as a visitor
I want to understand what I can do with this app
so I can decide if I want to use it

// Test Drive
as a visitor
I want to lookup a Lego set or MOC
so I can see what information is returned

// Sign Up
as a visitor
I want to register to use this app
so I can create a personal Lego® inventory

// Start Building Inventory
as a logged-in user
I want to see instructions and begin entering my Lego sets
so I can build my personal inventory

// Confirm Added
as a logged-in user
I want to see an image of the set/MOC/part I just entered
so I can confirm the item was added to my inventory

as a logged-in user
I want to add another set/MOC/part to my inventory
so my personal Lego inventory is up-to-date

as a logged-in user
I want to add a set/MOC/part to my inventory
so my personal Lego inventory is up-to-date

as a logged-in user
I want to adjust my inventory (subtract a set/MOC/part)
so my personal Lego inventory is up-to-date

as a logged-in user
I want to mark a set/MOC/parts as in-use (part of a permanent build)
so I can see what is left in my inventory

as a logged-in user
I want to fold my in-use set/MOC/parts back into my inventory
so I can see them in my list of sets/parts available for a build

as a logged-in user
I want to see a list of my Lego sets
so I can click on an option to view details

as a logged-in user
I want to be able to search for parts
so I can use the part number to add it to my inventory

//About
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



## Responsive
App is strongly built to be usuable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Google Maps integrated to view all entries by location
* Featured Theaters of the World Section
