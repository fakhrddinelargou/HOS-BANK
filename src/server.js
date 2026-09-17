const express = require('express');
const compteRouter = require('../src/routes/compte.routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());                         // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data (like form submissions)
app.use('/compte' , compteRouter)

app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
