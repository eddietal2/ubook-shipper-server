const express                 = require("express");
const app                     = express();
const dotenv                  = require('dotenv');
const mongoose                = require("mongoose");
const cors                    = require('cors');
const config                  = require("config");
const passport 	              = require('passport');


const shippersRoute              = require("./routes/shippers.route.js");
const loginRoute           = require("./routes/login.route.js");
const registerRoute           = require("./routes/register.route.js");

// Configure Environment Variables
dotenv.config();
console.log(process.env.DB_HOST_DEV)

// use config module to get the privatekey, if no private key set, end the application
if (!config.get("jwtSecret")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

mongoose
  // For DeprecationWarning:  collection.ensureIndex is deprecated.  Use createIndexes instead.
  .set('useCreateIndex', true)
  .set('useFindAndModify', false)
  .connect(process.env.DB_HOST_DEV, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB...\n"))
  .catch(err =>
    console.error(err))

// // Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.use(cors());
app.use(express.json());

app.use("/api/shipper", shippersRoute);
app.use("/api/shipper/login", loginRoute);
app.use("/api/shipper/register", registerRoute);

const port = process.env.PORT || 3000;
server = app.listen(port, () => {
  console.log('Starting UBook Shipper Server\n');
  console.log(`Listening on port ${port}...`)
});