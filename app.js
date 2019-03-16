const express = require("express");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

//connecting to the hosted mongodb

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const path = require("path");

//this tells express to use a cookie session, and we set the cookie to expire after 30 days
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

//passport config
require("./services/passport");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV == "production") {
    // Express will serve up production assets
    //like main.css and main.js
    app.use(express.static("client/build"));

    //express will serve index.js file if it doesnt recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 3001;

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
    app.get("/*", function(request, response) {
        response.sendFile(path.join(__dirname, "build", "index.html"));
    });
}

app.listen(port, function() {
    console.log(`listening ${port}`);
});

// "heroku-postbuild": "cd client && npm install && npm run build"
