const express = require('express');
const router = express.Router();
const user = require("../controller/UserController.js");

router.post("/user", user.create);
router.get("/user", user.getAll);
router.get("/user/:userId", user.findById);
router.put("/user/:userId", user.updateById);
router.delete("/user/:userId", user.remove);
router.delete("/user", user.removeAll);

module.exports = router;

