### If you want to follow a video tutorial while looking through the lab instructions, below is a link for the video

- https://www.youtube.com/watch?v=_HVl3toFL5s

# Step 1: Fork the repo

Navigate to our project repository https://github.com/ucsb-cs48-s20/project-s0-t2-env

Fork the project repo to your own personal GitHub account by clicking on the "Fork" button at the upper right hand of the repo's page on GitHub.

This creates a personal copy of the repo under your own GitHub account. This is necessary because you can't deploy an app to Heroku unless you have admin access to the repo.

# Step 2: Clone the repo

cd in the directory where you plan to do your work (ex. ~/cs48)

copy the URL for the new repo you created. That will for example be https://github.com/cgaucho/project-s0-t2-env.git but with cgaucho replaced with your GitHub id

- `git clone repo-url-goes-here`
  cd into that directory

# Step 3: See example of completed app

The example here shows what the app looks like when it is fully deployed on the web

- https://cs48-s20-s0-t2-prod.herokuapp.com/

You should be able to search any city you want and click on said city and be taken to a page that provides information about the environmental data for that city.

You should be able to login and logout:

- only once you logged in will you be able to see the individual user page
- on the individual user page you should be able to input personal data

Once you've completed this lab you should be able to:

- run this app locally
- deploy this app to the web address

# Step 4: Install node (if you didn't already do so for lab00)

- If you are working on CSIL, you may skip this step, because as of this writing (May 19, 2020), a sufficient version of node is installed on CSIL:

```
[pconrad@csil-05 ~]$ node --version
v10.16.3
[pconrad@csil-05 ~]$
```

- You may also skip this step if, when you type the command `node --version` on your local system. you see a version that is `10.*` or higher.
- Otherwise, follow the instructions here for installing node:

Additional installation advice for specific platforms can be found here:

- MacOS: <https://ucsb-cs48.github.io/jstopics/node_macos/>
- Windows: <https://ucsb-cs48.github.io/jstopics/node_windows/>
- Linux: <https://ucsb-cs48.github.io/jstopics/node_linux/>

When you have finished with those instructions, you should be able to do each of these at the terminal prompt:

- type `node --version` and get a number that is `10.*` or higher (e.g. `v10.16.3`)
- type `npm --version` and get a version number (as opposed to `command not found`)
- type `npx --version` and get a version number (as opposed to `command not found`)

# Step 5: Type `npm install`

The first time you clone this repo, as well as any time you pull/switch branches, you should update the project's
dependencies by running `npm install`

So, first make sure that you have done a `cd` into your proper repo, and then type:

```
npm install
```

You should see a lot of output, and with luck no error messages.

- Special note for MacOS users: if you see `gyp: No Xcode or CLT version detected!` and other errors about `gyp`, then
  check the page <https://ucsb-cs48.github.io/jstopics/node_macos/> for instructions on fixing this.

  - The short version is that you may need to reinstall the XCode command line tools. This takes 3-5 minutes on a decent home internet connection.
  - After reinstalling the XCode Command Line tools, repeat the `npm install` command and the errors related to `gyp` should go away.

You may ignore these warnings that appear when you do npm install:

```
npm WARN bootstrap@4.4.1 requires a peer of jquery@1.9.1 - 3 but none is installed. You must install peer dependencies yourself.
npm WARN bootstrap@4.4.1 requires a peer of popper.js@^1.16.0 but none is installed. You must install peer dependencies yourself.
```

Despite the note that `you must install` these peer dependencies, in fact, you do not need to install `jquery` and `popper`. The reason is that we're installing bootstrap is only for its stylesheets, not for the javascript-based component implementations that it has. We already have `react-bootstrap` as a dependency, which reimplements those javascript-based components in react, completely removing the need for the bootstrap implementations.

# Step 6: Configuration/Set up of OAuth for Localhost

Our repo uses Google OAuth for logins/logouts. Before we can run the application on localhost, we need to do some configuration.

The instructions for doing this configuration are linked to in the README.md file of the starter repo of lab00_nj, which you can read here: <https://github.com/ucsb-cs48-s20/demo-nextjs-app/blob/master/docs/auth0-localhost.md>

When creating a name make it more applicable (lab09) rather than lab00, and after the **All done!** come back to these instructions

# Step 7: Adding more to our .env file

As you may have noticed now our AUTH0_DOMAIN, AUTH0_CLIENT_ID, and AUTH0_CLIENT_SECRET are filled however there are a lot more fields that we need to complete in order for our repo to work properly

# Step 7a: Adding the Longitude/Latitude API key

Visit this website: <https://opencagedata.com/api#quickstart>

- Click on sign up for your free API Key
- Fill out the information prompted
- Check your email and you should have received an API Key sent to you
- In your .env with the API key you just received fill in LONGLAT_KEY=

# Step 7b: Adding the Air Quality API key

Visit the website: <https://aqicn.org/data-platform/token/#/>

- Fill out the form
- Check your email and click confirm
- In your .env with the API key you just received fill in AQI_KEY=

# Step 7c: Adding the login secret

Copy and paste this directly into your .env
`POST_LOGOUT_REDIRECT_URI="http://localhost:3000" REDIRECT_URI="http://localhost:3000/api/callback"`

This refers to the redirect url for when you logout of your oAuth. It will take you automatically back to the homepage which on localhost is just localhost:3000

When we deploy this to heroku we will change these to correlate on Heroku (Step 13)

# Step 7d: Adding the mongodb connection

- Go to mongodb.com, click sign in and create an account
- Under Shared Clusters "create a cluster".
- Set your cluster name to be environment and create the cluster
- It takes a couple of minutes to set up so just smile and wait
- Click on Collections
- Click on Add My Own Data
- Set the database name to be environment and the collection to be called cities inside the databases
- After you are done click Connect
- click add your current IP address
- click on create a MongoDB user (this can have any username and password)
- click on connect your application
- copy the connection string and put it in .env under MONGO_CONNECTION_STRING
- keep mongodb open you will need it in the next step

# Step 8: Creating the database

The city's water information and carbon information is stored in a database, so now that you have this MongoDB collection you want to populate it with data. Here you have two options

- Run our scripts and populate the data base with every city in California (this might take a while but you will get a more accurate representation of the full potentail of the app). If you choose this option proceed to Step 8a.
- Or if you just want to manually copy and paste data for a couple of cities on MongoDB to see the general overview of the app proceed to Step 8b.

# Step 8a: Populating the database through the script

Before you start running the scripts we need to install python3 and some python libraries. If you do not have python3 and are using a Mac type `brew install python3`. If not, visit http://python.org to install python 3.

Then, we will need to install pandas, numpy, pymongo, geopy, decouple, and openpyxl.

To do so type `pip install <name of module>` for each of the above.

- ex: `pip install pandas` `pip install numpy` ... etc.

If that does not work try `python3 -m pip install <name of module>` for each othe modules above.

- ex: `python3 -m pip install pandas`

After you have completed that we are ready to run the script.

First we will want to run the Carbon script.

First we will want to run the Carbon script.

To see the file, navigate to the folder scripts and the file carbonScript.py

- scripts/carbonScript.py

To run the script type `python3 scripts/carbonScript.py` in your terminal.

This process will take about half an hour to an hour depending on your internet speed. Once that script is completed you want to run the Water script.

Once again navigate to the folder scripts and the file waterQualityScript.py in order to see the file

- scripts/waterQualityScriptStable.py

To run the script type `python3 scripts/waterQualityScriptStable.py` in your terminal.

To run the script type `python3 scripts/waterQualityScript.py` in your terminal. Once again, if you do not have python3 type `brew install python3` or try running just `python scripts/waterQualityScripts.py`.

Once this is completed proceed to step 9.

# Step 8b: Populating the database manually

Below I have attached a JSON file containing the 10 cities.

On MongoDB under collections click on insert document on the right hand side of the screen.

Unselect the list view and click the {} View

You will see that they have already provided some formatting. Do not type inside of that rather underneath it.

Copy paste this below and after you pasted it delete everything that MongoDB had automatically provided so your file should only have this.

Once you are done click insert and you should see a collection that resembles this.

```json
[
  {
    "_id": {
      "$oid": "5e9904551c9d440000023b9f"
    },
    "name": "Goleta",
    "county": "Santa Barbara",
    "state": "CA",
    "CO2": 679561,
    "vehicleMilesTravelled": 24254,
    "electricity": 5996,
    "waterpH": 7.9,
    "totalDissolvedSolids": 519,
    "specificConductance": 827
  },
  {
    "_id": {
      "$oid": "5ea8b57b2a0fb9acf19b2d37"
    },
    "name": "Los Angeles",
    "county": "Los Angeles",
    "state": "CA",
    "vehicleMilesTravelled": 14832,
    "electricity": 5593,
    "waterpH": 7.8,
    "totalDissolvedSolids": 659,
    "specificConductance": 999
  },
  {
    "_id": {
      "$oid": "5ea8c07534891058165fd5a7"
    },
    "name": "San Francisco",
    "county": "San Francisco",
    "state": "CA",
    "CO2": 13443701,
    "vehicleMilesTravelled": 14754,
    "electricity": 5217,
    "waterpH": 7.51,
    "totalDissolvedSolids": 331,
    "specificConductance": 567
  },
  {
    "_id": {
      "$oid": "5ea8c23234891058165fd5a8"
    },
    "name": "Santa Barbara",
    "county": "Santa Barbara",
    "state": "CA",
    "CO2": 2425803,
    "vehicleMilesTravelled": 22700,
    "electricity": 6574,
    "waterpH": 7.9,
    "totalDissolvedSolids": 519,
    "specificConductance": 827
  },
  {
    "_id": {
      "$oid": "5ea8c29334891058165fd5a9"
    },
    "name": "San Diego",
    "county": "San Diego",
    "state": "CA",
    "CO2": 18674513,
    "vehicleMilesTravelled": 21496,
    "electricity": 6569,
    "waterpH": 7.2,
    "totalDissolvedSolids": 13200,
    "specificConductance": 63300
  },
  {
    "_id": {
      "$oid": "5ea8ccd6d7beb347a9090ee5"
    },
    "name": "San Jose",
    "county": "Santa Clara",
    "state": "CA",
    "CO2": 15830739,
    "vehicleMilesTravelled": 28858,
    "electricity": 6976,
    "waterpH": 7.5,
    "totalDissolvedSolids": 360,
    "specificConductance": 603
  },
  {
    "_id": {
      "$oid": "5ea8cd29d7beb347a9090ee6"
    },
    "name": "Sacramento",
    "county": "Sacramento",
    "state": "CA",
    "CO2": 11039447,
    "vehicleMilesTravelled": 19694,
    "electricity": 6791,
    "waterpH": 8,
    "totalDissolvedSolids": 123,
    "specificConductance": 195
  },
  {
    "_id": {
      "$oid": "5ea8cdb7d7beb347a9090ee7"
    },
    "name": "Oakland",
    "county": "Alameda",
    "state": "CA",
    "CO2": 5975632,
    "vehicleMilesTravelled": 17403,
    "electricity": 5602,
    "waterpH": 7.2,
    "totalDissolvedSolids": 986,
    "specificConductance": 1660
  },
  {
    "_id": {
      "$oid": "5ea8ce1bd7beb347a9090ee8"
    },
    "name": "Anaheim",
    "county": "Orange",
    "state": "CA",
    "CO2": 4765640,
    "vehicleMilesTravelled": 22915,
    "electricity": 7251,
    "waterpH": 7.5,
    "totalDissolvedSolids": 453,
    "specificConductance": 716
  },
  {
    "_id": {
      "$oid": "5ea8cef9d7beb347a9090ee9"
    },
    "name": "Fresno",
    "county": "Fresno",
    "state": "CA",
    "CO2": 7142670,
    "vehicleMilesTravelled": 19428,
    "electricity": 7480,
    "waterpH": 8.1,
    "totalDissolvedSolids": 980,
    "specificConductance": 1420
  }
]
```

# Step 9: Running on Localhost

At this point you should be able to run the application on localhost.

In your terminal type `npm run dev` to see the application run. Go to localhost:3000 to see if the product is running.

If it works, proceed to the next step.

# Step 10: Configuring secrets for GitHub Actions

At this point, if you look at your GitHub repo, you’ll probably see that there is an red X next to the commit hash on the main page.

The red x signifies that GitHub Action is trying to run test cases for this repo, but the test cases are failing. This is likely because the secrets necessary for GitHub Actions to succeed have not yet been configured.

Here is a link on how to configure the secrets for GitHub Actions: https://github.com/ucsb-cs48-s20/demo-nextjs-app/blob/master/docs/auth0-github-actions.md

After the **Next Step**, return here instead of the README linked.

# Step 11: Configure the application to run on Heroku

The instructions are listed below:

As you are following the instructions make sure you are naming the lab properly and not just writing lab00 everywhere.

- https://github.com/ucsb-cs48-s20/demo-nextjs-app/blob/master/docs/heroku.md

After **Step 10** is complete return here.

# Step 12: Continue with lab09

Congratulations! The app should now be working on Heroku. Refer back to https://ucsb-cs48.github.io/s20/lab/lab09/ to continue with the rest of the lab.
