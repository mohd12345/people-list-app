const express = require("express")

const userController = require("./user")

const router = express.Router();

// ------------------people routes----------------------------
router.post('/', userController.post);
router.get('/', userController.list);
router.get('/:id', userController.get);
router.put('/:id', userController.put);
router.delete('/:id', userController.delete);

module.exports = router;
