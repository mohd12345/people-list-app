const express = require("express")
const userRoute = require("./controller/user/route")

const router = express.Router();

router.use('/people', userRoute);

module.exports = router;
