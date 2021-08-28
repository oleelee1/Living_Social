const express = require('express');
const createEvent_router = express.Router();
const createEvent_controller = require('../controllers/createEvent_controller');

createEvent_router.get('/createEvent_main', createEvent_controller.createEvent_createEventMainGet);
createEvent_router.get('/index', createEvent_controller.createEvent_createEventIndexGet);

createEvent_router.post('/createEvent_main', createEvent_controller.createEvent_createEventMain);
createEvent_router.post('/createEvent_type', createEvent_controller.createEvent_createEventType);
createEvent_router.post('/createEvent_date', createEvent_controller.createEvent_createEventDate);
createEvent_router.post('/createEvent_guestList', createEvent_controller.createEvent_createEventGuestList);
createEvent_router.post('/createEvent_venue', createEvent_controller.createEvent_createEventVenue);
createEvent_router.post('/createEvent_provisions', createEvent_controller.createEvent_createEventProvisions);

createEvent_router.post('/createEvent_type/communityEvent', createEvent_controller.createEvent_communityEventInfo);
createEvent_router.post('/createEvent_type/socialEvent', createEvent_controller.createEvent_socialEventInfo);
createEvent_router.post('/createEvent_type/tournamentEvent', createEvent_controller.createEvent_tournamentEventInfo);
createEvent_router.post('/createEvent_type/fundraisingEvent', createEvent_controller.createEvent_fundraisingEventInfo);
createEvent_router.post('/createEvent_type/festivalEvent', createEvent_controller.createEvent_festivalEventInfo);
createEvent_router.post('/createEvent_type/otherEvent', createEvent_controller.createEvent_otherEventInfo);

module.exports = createEvent_router;