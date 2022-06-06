// Setup router
const express = require('express');
const router = express.Router();

// Pass routes through router
router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));
router.use(require('./voterRoutes'));
router.use(require('./voteRoutes'));



// export router
module.exports = router;