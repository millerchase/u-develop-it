// Setup router
const express = require('express');
const router = express.Router();

// Require routes
const candidateRoutes = require('./candidateRoutes');
const partyRoutes = require('./partyRoutes');

// Pass routes through router
router.use(candidateRoutes);
router.use(partyRoutes);



// export router
module.exports = router;