const express = require('express');
const compteRouter = require('../src/routes/compte.routes');

require("dotenv").config();

const session = require("express-session");


// 2. Initialize the Express application instance
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// 3. Define the port environment variable (defaulting to 3000)
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());                         // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data (like form submissions)
app.use('/compte' , compteRouter)

// 5. Define a test route
app.get('/', (req, res) => {
    res.send('Your Express server is successfully prepared and running!');
});


//auth
const authRoutes = require("./routes/auth.routes");
app.use('/auth', authRoutes);


// 6. Bind and listen for connections on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
