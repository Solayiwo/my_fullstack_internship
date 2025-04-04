const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/", formController.createForm);
router.get("/:email", formController.readForm);
router.put("/:email", formController.updateForm);
router.delete("/:email", formController.deleteForm);

module.exports = router;
