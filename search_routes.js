const express = require('express');
const search_router = express.Router();
const search_controller = require('../controllers/search_controller');

search_router.get('/', search_controller.search_everything);
search_router.get('/everything', search_controller.search_everything);
search_router.get('/people', search_controller.search_people);
search_router.get('/localGroups', search_controller.search_localGroups);
search_router.get('/events', search_controller.search_events);

// search_router.post('/everything', search_controller.search_everything_create);

module.exports = search_router;