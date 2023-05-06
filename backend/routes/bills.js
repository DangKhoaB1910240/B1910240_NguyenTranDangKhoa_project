const express = require("express");
const router = express.Router();
const bills = require("../models/bills");
const { ObjectId } = require("mongodb");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const { id } = req.query;
      console.log(id);
      let s;
      if (id != undefined) {
        s = await bills.find({ id_user: new ObjectId(id) });
      } else {
        s = await bills.find({});
      }

      res.json(s);
    } catch (err) {
      res.status(500).json({ message: err.message });
      //Không phải lỗi người dùng hay khách hàng
      //Lỗi 500 là do CSDL có vấn đề
    }
  })
  .post(async (req, res) => {
    const s = new bills({
      id_user: req.body.id_user,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      addr: req.body.addr,
      total: req.body.total,
      payment: req.body.payment,
      products: req.body.products,
      status: req.body.status,
      purchase_date: req.body.purchase_date,
    });
    try {
      const newS = await s.save();
      res.status(201).json(newS);
    } catch (err) {
      //Lỗi 400 là do người dùng nhập vào nha
      res.status(400).json({ message: err.message });
    }
  });
router
  .route("/:id")
  .patch(getBill, async (req, res) => {
    if (req.body.status != null) {
      res.bill.status = req.body.status;
    }
    try {
      const updatedBill = await res.bill.save();
      res.json(updatedBill);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
  .delete(getBill, async (req, res) => {
    try {
      await res.bill.deleteOne();
      res.json({ message: "deleted" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
async function getBill(req, res, next) {
  let bill;
  try {
    bill = await bills.findById(req.params.id);
    if (bill == null) {
      //Lỗi 404 không tìm thấy
      return res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
  res.bill = bill;
  next();
}
module.exports = router;
