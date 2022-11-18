const router = require("express").Router();
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal,
} = require("../../lib/animals");
const { animals } = require("../../data/animals");

router.get("/animals", (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    // Show json results
    res.json(results);
});

router.get("/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        // If valid id, show result
        res.json(result);
    } else {
        // If invalid id, show error
        res.send(404);
    }
});

router.post("/animals", (req, res) => {
    // Set id based on what next index of array will be
    req.body.id = animals.length.toString();

    // If any data is req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send("The animal is not properly formatted.");
    } else {
        const animal = createNewAnimal(req.body, animals);
        // If successful, create data in .json
        res.json(animal);
    }
});

module.exports = router;