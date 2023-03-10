# Sleepy-app
Final Project for Parsity

Project’s title is SleepyApp.
The application is primarily designed for mothers/parents.

Technologies Used:
* Frontend: React/Redux, Yup,  @react-google-maps/api
* Backend: MongoDB/Mongoose, Node.js, Express, Passport, Twilio SendGrid Mail Send API, Google Maps API Web Services
* Deployment: Heroku

The app handles 3 functionalities: 

1. Provide recommendations on a baby's sleep schedule based on input data that is analyzed and processed in order to provide recommendations. This is where the name of the app comes from - SleepyApp.
It works within the following flow: 
* A user needs to sign up and sign in, providing the kid's birth date.d.
* A user submits a form for providing a baby's day schedule. This data gets sent to the back-end where all the following actions are being processed. 
* Based on the birthdate and current date, the age of the child is being calculated in order to get appropriate sleep norms for this age.
* Input data is compared with sleep norms data 
* Based on this comparison personal recommendations are to be prepared and sent the front-end.
* Data and results from this document are saved into the user’s profile. 
* A user could submit as much forms as he/she wants, all of them are saved and displayed into the profile. It'’s also possible to delete each of them as well as to delete profile at all. 

2. To get the nearest playgrounds - with the usage of Google Maps 
This one is for all users. If the user clicks the "Locate me" button, all of the nearest playgrounds are displayed on the map, and when the user clicks on one of them, the route to the playground is displayed. Additionally, users may add playgrounds to the map and leave comments. 
As of now, it only finds nearby playgrounds and displays information on each after clicking the icon.


3. To find nearby restaurants and cafes with children's rooms, using Google maps.
This one is not working yet at all, just for fun I add an entertainment - on clicking button it fetches and displays a random artwork from Chicago art museum open API resource. 
