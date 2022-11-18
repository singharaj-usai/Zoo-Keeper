const router = require("express").Router();
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers");

router.get("/zookeepers", (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    // Show json results
    res.json(results);
});

router.get("/zookeepers/:id", (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        // If valid id, show result
        res.json(result);
    } else {
        // If invalid id, show error
        res.send(404);
    }
});

router.post("/zookeepers", (req, res) => {
    // Set id based on what next index of array will be
    req.body.id = zookeepers.length.toString();

    if (!validateZookeeper(req.body)) {
        // If any data is req.body is incorrect, send 400 error back
        res.status(400).send("The zookeeper is not properly formatted.");
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        // If successful, create data in .json
        res.json(zookeeper);
    }
});

module.exports = router;