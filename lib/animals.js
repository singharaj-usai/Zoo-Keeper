const fs = require('fs');
const path = require('path');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // If personalityTraits is a string, place in new array and save.
        if (typeof query.personalityTraits === "string") {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        console.log(personalityTraitsArray);
        // Loop through each trait in the personalityTraitsArray
        personalityTraitsArray.forEach((trait) => {
            // Check trait compared to all animals in the array.
            // Filtered results will only show animals that contain the trait
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        // Shows all animals with queried diet
        filteredResults = filteredResults.filter(
            animal => animal.diet === query.diet
        );
    }
    if (query.species) {
        // Shows all animals with queried species
        filteredResults = filteredResults.filter(
            animal => animal.species === query.species
        );
    }
    if (query.name) {
        // Shows all animals with queried name
        filteredResults = filteredResults.filter(
            animal => animal.name === query.name
        );
    }
    // return filtered results
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter((animal) => animal.id === id)[0];
    return result;
}

// Creates new animal data in animals.json file
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, "../data/animals.json"),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== "string") {
        return false;
    }
    if (!animal.species || typeof animal.species !== "string") {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== "string") {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};