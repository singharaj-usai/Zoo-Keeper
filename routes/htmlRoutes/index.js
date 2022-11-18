const path = require('path');
const router = require('express').Router();

router.get("/", (req, res) => {
    // Sends index.html to be the / page for the site
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/animals", (req, res) => {
    // sends animals.html to be the /animals page for the site
    res.sendFile(path.join(__dirname, "../../public/animals.html"));
});

module.exports = router;