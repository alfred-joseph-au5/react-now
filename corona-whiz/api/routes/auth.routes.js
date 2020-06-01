const express = require('express');
const router = express.Router();

const AuthController = require('../controller/auth.controller');

router.post('/auth', AuthController.createSession);

router.delete('/auth', AuthController.deleteSession);

module.exports = router;