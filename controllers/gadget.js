// controllers/gadget.js
const Gadget = require('../models/gadget');

// List of all Gadgets as JSON
exports.gadget_list = async function (req, res) {
  try {
    const gadgets = await Gadget.find();
    res.json(gadgets);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

// View to display all Gadgets using Pug
exports.gadget_view_all_Page = async function (req, res) {
  try {
    const gadgets = await Gadget.find();
    res.render('gadgets', { title: 'Gadget Search Results', results: gadgets });
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};

// Details for a specific Gadget
exports.gadget_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Gadget detail: ' + req.params.id);
};

// Handle Gadget create on POST
exports.gadget_create_post = async function (req, res) {
  const gadget = new Gadget({
    gadget_name: req.body.gadget_name,
    brand: req.body.brand,
    price: req.body.price
  });

  try {
    const result = await gadget.save();
    res.json(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

// Handle Gadget delete on DELETE
exports.gadget_delete = function (req, res) {
  res.send('NOT IMPLEMENTED: Gadget delete DELETE ' + req.params.id);
};

// Handle Gadget update on PUT
exports.gadget_update_put = function (req, res) {
  res.send('NOT IMPLEMENTED: Gadget update PUT ' + req.params.id);
};
