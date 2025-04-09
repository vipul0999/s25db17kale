// controllers/gadget.js
const Gadget = require('../models/gadget');

// List of all Gadgets
exports.gadget_list = async function (req, res) {
  try {
    const gadgets = await Gadget.find();
    res.json(gadgets);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

// Details for a specific Gadget
exports.gadget_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Gadget detail: ' + req.params.id);
};

// Handle Gadget create on POST
exports.gadget_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Gadget create POST');
};

// Handle Gadget delete on DELETE
exports.gadget_delete = function (req, res) {
  res.send('NOT IMPLEMENTED: Gadget delete DELETE ' + req.params.id);
};

// Handle Gadget update on PUT
exports.gadget_update_put = function (req, res) {
  res.send('NOT IMPLEMENTED: Gadget update PUT ' + req.params.id);
};
