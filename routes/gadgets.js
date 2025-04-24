const express = require('express');
const router = express.Router();
const gadget_controller = require('../controllers/gadget');

// ✅ Middleware to protect routes
const secured = (req, res, next) => {
  if (req.user) return next();

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(401).json({ error: 'Authentication required to access this resource.' });
  }

  return res.status(401).render('login', {
    title: 'Login Required',
    message: 'Please login to access this page.'
  });
};

// 📌 PUBLIC ROUTES

// View all gadgets
router.get('/', gadget_controller.gadget_view_all_Page);

// View detail of one gadget
router.get('/detail', gadget_controller.gadget_view_one_Page);

// 📌 PROTECTED ROUTES - VIEWS

// Show create gadget form
router.get('/create', secured, gadget_controller.gadget_create_Page);

// Show update gadget form
router.get('/update', secured, gadget_controller.gadget_update_Page);

// Show delete gadget confirmation
router.get('/delete', secured, gadget_controller.gadget_delete_Page);

// 📌 PROTECTED ROUTES - ACTIONS

// Handle creation of a gadget
router.post('/create', secured, gadget_controller.gadget_create_post);

// Handle update (this is usually handled via /resource)
router.put('/:id', secured, gadget_controller.gadget_update_put);

// Handle deletion of a gadget
router.delete('/:id', secured, gadget_controller.gadget_delete);

module.exports = router;
