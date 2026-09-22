const express = require('express');
const authRoutes = require("./routes/auth.routes");
const ribRoutes = require("./routes/rib.routes");
const complaintRoutes = require("./routes/complaint.routes");
const compteRouter = require('./routes/compte.routes');
const session = require("express-session");
require("dotenv").config();



const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// 3. Define the port environment variable (defaulting to 3000)
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use('/compte' , compteRouter)
app.use('/auth', authRoutes);
app.use('/rib', ribRoutes);

//auth
app.use('/auth', authRoutes);

//complaint
app.use('/complaint', complaintRoutes);


// 6. Bind and listen for connections on the specified port

app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
