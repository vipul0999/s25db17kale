const express = require('express');
const router = express.Router();

const api_controller = require('../controllers/api');
const gadget_controller = require('../controllers/gadget');

// API base
router.get('/', api_controller.api);

// Gadget routes
router.get('/gadgets', gadget_controller.gadget_list);
router.get('/gadgets/:id', gadget_controller.gadget_detail);
router.post('/gadgets', gadget_controller.gadget_create_post);
router.put('/gadgets/:id', gadget_controller.gadget_update_put);
router.delete('/gadgets/:id', gadget_controller.gadget_delete);

module.exports = router;
