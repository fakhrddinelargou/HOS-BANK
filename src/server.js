const express = require('express');
const app = express();
//routes
const authRoutes = require("./routes/auth.routes");
const ribRoutes = require("./routes/rib.routes");
const complaintRoutes = require("./routes/complaint.routes");
const compteRouter = require('./routes/compte.routes');
const beneficiariesRouter = require('./routes/beneficiaires.routes');
const viewRoutes = require("./routes/view.routes");
//session
const session = require("express-session");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const path = require("path");
require("dotenv").config();
//views
app.set('view engine', "ejs");
app.set("views", path.join(__dirname, "views"));


// 3. Define the port environment variable (defaulting to 3000)
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use('/compte' , compteRouter)
app.use('/auth', authRoutes);
app.use('/rib', ribRoutes);

//auth
app.use('/auth', authRoutes);
app.use('/beneficiaries', beneficiariesRouter);
//views
app.use('/', viewRoutes);

//complaint
app.use('/complaint', complaintRoutes);



app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
