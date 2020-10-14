# Grocery Guide — Hack For Hope 2020 Winner (Judge's Choice)
<img src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/035/831/datas/gallery.jpg" width="400" height="300" alt = "Grocery Guide">

**Devpost:** https://devpost.com/software/grocery-guide-ti9xf5

**Frontend Repository:** https://github.com/aaronw4ng/hack_for_hope_frontend

## :ledger: Index

- [About](#beginner-about)
- [Development](#wrench-development)
  - [Architecture](#nut_and_bolt-architecture)
  - [Contributions](#fire-contributions)

- [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)
  - [Commands](#package-commands)

##  :beginner: About
Grocery Guide is a mobile application developed to assist families and communities in making an informed decision about when and where to grocery shop, in turn promoting healthy habits within our broader communities. 

##  :wrench: Development

###  :nut_and_bolt: Architecture

**Frontend:** React Native, Expo

**Backend:** Node, Express, Google Places API, Google Distance Matrix API, Apify

Our backend recommendation algorithm takes in:

- The user's travel method (driving, walking, bicycling)

- How long the user is willing to travel (5 min, 15 min, 30 min, 45 min, 60 min)

- How many days the user has before he/she runs out of groceries

- What time of the day the user wants to shop (morning, afternoon evening)

- The user's current location

Then:

- Filters out the neighborhoods that would take too long for the user to travel to given how long the user is willing to travel and the user's travel method, taking into account real time and predicted traffic data (Google Distance Matrix API, Google Places API)

- Scrapes up-to-date COVID-19 data (the number of cases in each city in Los Angeles) from the Los Angeles Department of Public Health (Cheerio.js)

- Ranks the grocery stores based on their safety, which is determined by the number of COVID-19 cases in the neighborhood grocery stores are located in

- Sorts the recommendations based on a Bayesian estimate

- Determines the optimal times the user should go to the top 5 Bayesian-ranked grocery stores based on real time and predicted busy times (Google Places API, Apify)

- To save time (and Google API credits), neighborhood grocery store data is saved into a json file and updated periodically. User preferences entered into the app are stored locally on the user's phone rather than a cloud database.

###  :fire: Contributions

I collaborated with 2 engineers, a product manager, and a UI/UX designer to work through ideation, strategy, and development

I was responsible for: 

- Developing Bayesian algorithm leveraging Google Distance Matrix/Places API and scraped COVID safety data into JSON format

  - *getBayesianEstimate.js*
  
  - *getGroceryStores*
  
  - *getNeighborhoods*
  
  - *getPopularTimes*

- Implementing and styling React Native components for the user registration and search flow

  - *All Signup Screens*
  
  - *Navigator*
  
  - *BottomBar*
  
 - Collaborating with other engineers via VSCode Live to remotely assist in engineering sprints and development of entire project
  
## :zap: Usage

###  :electric_plug: Installation
- Clone frontend and backend repositories

- Make sure to have latest versions of xCode and Expo 

- Install dependencies

###  :package: Commands
- To run the server
```
$ npm start
```

- To view mobile application in Expo
```
$ expo start expo
```
