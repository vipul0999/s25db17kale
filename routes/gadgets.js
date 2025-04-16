var express = require('express');
var router = express.Router();

const gadget_controller = require('../controllers/gadget');

// Home page that displays all gadgets (for static test data)
router.get('/', gadget_controller.gadget_view_all_Page);

// Detail view of a gadget by ID
router.get('/detail', gadget_controller.gadget_view_one_Page);

// Create form view
router.get('/create', gadget_controller.gadget_create_Page);

// Update form view
router.get('/update', gadget_controller.gadget_update_Page);

// Delete confirmation view
router.get('/delete', gadget_controller.gadget_delete_Page);

module.exports = router;