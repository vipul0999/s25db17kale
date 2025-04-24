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

// View to display one Gadget using query param ID
exports.gadget_view_one_Page = async function (req, res) {
  console.log("Single view for id " + req.query.id);
  try {
    const result = await Gadget.findById(req.query.id);
    if (!result) {
      return res.status(404).render('gadgetdetail', { title: 'Gadget Detail', toShow: null });
    }
    res.render('gadgetdetail', { title: 'Gadget Detail', toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};

// Details for a specific Gadget via API
exports.gadget_detail = async function (req, res) {
  console.log("detail " + req.params.id);
  try {
    const result = await Gadget.findById(req.params.id);
    if (!result) {
      res.status(404).send({ error: `Document with id ${req.params.id} not found` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500);
    res.send(`{"error": "document for id ${req.params.id} not found"}`);
  }
};

// Handle Gadget create on POST
exports.gadget_create_post = async function (req, res) {
  let document = new Gadget({
    gadget_name: req.body.gadget_name,
    brand: req.body.brand,
    price: req.body.price
  });

  try {
    const result = await document.save();
    res.json(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error("Validation Error:", err.message);
      res.status(400).send({ error: err.message });
    } else {
      res.status(500).send({ error: err });
    }
  }
};

// Handle Gadget delete on DELETE
exports.gadget_delete = async function (req, res) {
  try {
    const result = await Gadget.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).send({ error: `Document with id ${req.params.id} not found` });
    } else {
      res.send({ message: `Gadget with id ${req.params.id} deleted successfully` });
    }
  } catch (err) {
    res.status(500);
    res.send({ error: err });
  }
};

// Handle building the view for creating a gadget
exports.gadget_create_Page = function(req, res) {
  console.log("Create view");
  try {
    res.render('gadgetcreate', { title: 'Gadget Create' });
  } catch (err) {
    res.status(500);
    res.send(`{"error": "${err}"}`);
  }
};

// Handle building the view for updating a gadget (GET with ?id)
exports.gadget_update_Page = async function (req, res) {
  console.log("Update view for item " + req.query.id);
  try {
    const gadget = await Gadget.findById(req.query.id);
    if (!gadget) {
      return res.status(404).render('error', {
        message: 'Gadget not found',
        error: {}
      });
    }
    res.render('gadgetupdate', { title: 'Gadget Update', toShow: gadget });
  } catch (err) {
    res.status(500).render('error', {
      message: 'Server error',
      error: err
    });
  }
};

// Handle Gadget update on PUT
exports.gadget_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Gadget.findById(req.params.id);
    if (!toUpdate) {
      return res.status(404).send({ error: `Document with id ${req.params.id} not found` });
    }
    if (req.body.gadget_name) toUpdate.gadget_name = req.body.gadget_name;
    if (req.body.brand) toUpdate.brand = req.body.brand;
    if (req.body.price) toUpdate.price = req.body.price;

    let result = await toUpdate.save();
    console.log("Success: " + result);
    res.json(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error("Validation Error:", err.message);
      res.status(400).send({ error: err.message });
    } else {
      res.status(500);
      res.send({ error: `${err}: Update for id ${req.params.id} failed` });
    }
  }
};

// Handle a deletae one view with id from query
exports.gadget_delete_Page = async function(req, res) {
  console.log("Delete view for id " + req.query.id);
  try {
    const result = await Gadget.findById(req.query.id);
    if (!result) {
      res.status(404);
      res.render('gadgetdelete', { title: 'Gadget Delete', toShow: null });
    } else {
      res.render('gadgetdelete', { title: 'Gadget Delete', toShow: result });
    }
  } catch (err) {
    res.status(500);
    res.render('error', { message: 'Error loading delete view', error: err });
  }
};
