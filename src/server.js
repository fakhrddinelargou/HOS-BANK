const express = require('express');
const authRoutes = require("./routes/auth.routes");
const compteRouter = require('../src/routes/compte.routes');
const session = require("express-session");

require("dotenv").config();


const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/compte' , compteRouter)
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
