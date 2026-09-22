const express = require('express');
const app = express();
const authRoutes = require("./routes/auth.routes");
const ribRoutes = require("./routes/rib.routes");
const compteRouter = require('./routes/compte.routes');
const beneficiariesRouter = require('./routes/beneficiaires.routes')
const session = require("express-session");
require("dotenv").config();


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
app.use('/auth', authRoutes);
app.use('/beneficiaries', beneficiariesRouter);




app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
