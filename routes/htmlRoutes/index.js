const path = require('path');
const router = require('express').Router();

router.get("/", (req, res) => {
    // Sends index.html to be the / page for the site
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/animals", (req, res) => {
    // Sends animals.html to be the /animals page for the site
    res.sendFile(path.join(__dirname, "../../public/animals.html"));
});

router.get("/zookeepers", (req, res) => {
    // Sends zookeepers.html to be the /zookeepers page for the site
    res.sendFile(path.join(__dirname, "../../public/zookeepers.html"));
});

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

module.exports = router;