const express = require("express");
const router = express.Router();
const products = require("../models/products.js");
const { ObjectId } = require("mongodb");
router
  .route("/")
  .get(async (req, res) => {
    let documents = [];
    try {
      const { active } = req.query;
      if (active != undefined) {
        documents = await products.find({ active: active });
      } else {
        documents = await products.find({});
      }
      res.send(documents);
    } catch (err) {
      //Lỗi 500 do CSDL có vấn đề
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    const product = new products({
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      img: req.body.img,
      active: req.body.active,
      id_category: req.body.id_category,
    });
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      //Lỗi do người dùng nhập vào
      res.status(400).json({ message: err.message });
    }
  });
router
  .route("/:id")
  .get(getProductById, async (req, res) => {
    res.send(res.product);
  })
  .delete(getProductById, async (req, res) => {
    try {
      await res.product.deleteOne();
      res.json({ message: "deleted" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  })
  .patch(getProductById, async (req, res) => {
    if (req.body.name != null) {
      res.product.name = req.body.name;
    }
    if (req.body.price != null) {
      res.product.price = req.body.price;
    }
    if (req.body.desc != null) {
      res.product.desc = req.body.desc;
    }
    if (req.body.img != null) {
      res.product.img = req.body.img;
    }
    if (req.body.active != null) {
      res.product.active = req.body.active;
    }
    if (req.body.id_category != null) {
      res.product.id_category = req.body.id_category;
    }
    try {
      const updatedproduct = await res.product.save();
      res.json(updatedproduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// router.route("/category").get(async (req, res) => {
//   let documents = [];
//   try {
//     const { id_category } = req.query;
//     console.log(id);
//     if (id != undefined) {
//       documents = await products.find({ id_category: ObjectId(id) });
//     } else {
//       documents = await products.find({});
//     }
//     res.send(documents);
//   } catch (err) {
//     //Lỗi 500 do CSDL có vấn đề
//     res.status(500).json({ message: err.message });
//   }
// });
async function getProductById(req, res, next) {
  let product;
  try {
    product = await products.findById(req.params.id);
    if (product == null) {
      //404 ko tìm thấy
      return res.json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
  res.product = product;
  next();
}
module.exports = router;
