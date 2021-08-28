const express = require('express');
const home_router = express.Router();
const home_controller = require('../controllers/home_controller');

home_router.get('/', home_controller.home_homepage);

module.exports = home_router;