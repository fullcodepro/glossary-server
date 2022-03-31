const router = require('express').Router();
const { signin } = require('../controllers/auth.controllers');

router.post('/signin', signin);

module.exports = router;