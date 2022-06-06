// Node modules
const express = require('express');

// Relative imports
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connections');
const apiRoutes = require('./routes/apiRoutes');

// Server setup
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Home page request
app.get('/', (req, res) => {
    res.json({
        message: "Hello World!"
    });
});


// Default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});


// Start server after DB connection
db.connect(err => {
    
    if (err) throw err;
    
    console.log('Database connected.');

    // Server launch
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})