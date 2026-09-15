// 1. Import the express library
const express = require('express');

// 2. Initialize the Express application instance
const app = express();

// 3. Define the port environment variable (defaulting to 3000)
const PORT = process.env.PORT || 3000;

// 4. Built-in Middleware Preparation (Crucial for parsing request data)
app.use(express.json());                         // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data (like form submissions)

// 5. Define a test route
app.get('/', (req, res) => {
    res.send('Your Express server is successfully prepared and running!');
});

// 6. Bind and listen for connections on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
