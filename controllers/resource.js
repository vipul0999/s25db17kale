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
        res.status(400).send({ error: err.message }); // 👈 clearer output
      } else {
        res.status(500).send({ error: err });
      }
    }
  };
  