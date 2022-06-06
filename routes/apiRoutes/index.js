// Setup router
const express = require('express');
const router = express.Router();

// Require routes
const candidateRoutes = require('./candidateRoutes');
const partyRoutes = require('./partyRoutes');
const voterRoutes = require('./voterRoutes');

// Pass routes through router
router.use(candidateRoutes);
router.use(partyRoutes);
router.use(voterRoutes);



// export router
module.exports = router;