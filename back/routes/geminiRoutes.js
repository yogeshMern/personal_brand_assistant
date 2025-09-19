const express = require("express");
const { generateContentCalendar } = require("../controllers/geminiController");

const router = express.Router();

router.post("/text", generateContentCalendar);

module.exports = router;
