
require('module-alias/register');
const mongoose = require('mongoose');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 16 || (major === 16 && minor <= 20)) {
  console.log('Please upgrade your node.js version at least 16.20.2 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

// Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE);

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (error) => {
  console.log(
    `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
  );
  console.error(`2. 🚫 Error → : ${error.message}`);
});

const glob = require('glob');
const path = require('path');
glob.sync('./models/**/*.js').forEach(function (file) {
  require(path.resolve(file));
});

//===========Code from app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helpers = require('./helpers');
const coreAuthRouter = require('./routes/coreRoutes/coreAuth');
const coreApiRouter = require('./routes/coreRoutes/coreApi');
const coreDownloadRouter = require('./routes/coreRoutes/coreDownloadRouter');
const corePublicRouter = require('./routes/coreRoutes/corePublicRouter');
const { isValidAdminToken } = require('./controllers/coreControllers/authJwtController');
const { isValidMobileToken } = require('./controllers/coreControllers/authJwtController');
const errorHandlers = require('./handlers/errorHandlers');
const erpApiRouter = require('./routes/appRoutes/appApi');

// create our Express app
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.set('trust proxy', 1);

// setting cors at one place for all the routes
// putting cors as first in order to avoid unneccessary requests from unallowed origins

// app.use(function (req, res, next) {
//   if (req.url.includes('/api')) {
//     cors(corsOptions)(req, res, next);
//   } else {
//     cors()(req, res, next);
//   }
// });

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is

// Takes the raw requests and turns them into usable properties on req.body

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// pass variables to our templates + all requests

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.admin = req.admin || null;
  res.locals.currentPath = req.path;
  next();
});

// Here our API Routes
app.use('/api', coreAuthRouter);
app.use('/api', isValidAdminToken, coreApiRouter);
//app.use('/api', isValidAdminToken, erpApiRouter);
app.use('/api', isValidMobileToken, erpApiRouter);
app.use('/download', coreDownloadRouter);
app.use('/public', corePublicRouter);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);
//===========Code from app.js

//const express = require('express');
//const app = express();
//const app = require('./app');
const port = process.env.PORT || 8888
// app.get('/', (req, res) => {
//   res.send('Hello, IIS and Node.js!');
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
