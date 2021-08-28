const express = require('express');
const account_router = express.Router();
const account_controller = require('../controllers/account_controller');

account_router.get('/', account_controller.accountMain);

account_router.get('/main', account_controller.accountMain);

module.exports = account_router;