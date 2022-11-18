const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require('../lib/animals');
const { animals } = require('../data/animals');

jest.mock('fs');

test("creates an animal object", () => {
    const animal = createNewAnimal(
        { name: "Darlene", id: "1408" },
        animals
    );

    expect(animal.name).toBe("Darlene");
    expect(animal.id).toBe("1408");
});

test("filters by query", () => {
    const startingAnimals = [
        {
            id: "1",
            name: "Travis",
            species: "chimpanzee",
            diet: "herbivore",
            personalityTraits: ["anxious", "goofy"],
        },
        {
            id: "2",
            name: "Koko",
            species: "gorilla",
            diet: "herbivore",
            personalityTraits: ["quirky", "rash"],
        },
    ];

    const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

    expect(updatedAnimals.length).toEqual(1);
});

test("finds by id", () => {
    const startingAnimals = [
        {
            id: "1",
            name: "Travis",
            species: "chimpanzee",
            diet: "herbivore",
            personalityTraits: ["anxious", "goofy"],
        },
        {
            id: "2",
            name: "Koko",
            species: "gorilla",
            diet: "herbivore",
            personalityTraits: ["quirky", "rash"],
        },
    ];

    const result = findById("2", startingAnimals);

    expect(result.name).toBe("Koko");
});

test("validates personality traits", () => {
    const animal = {
        id: "1",
        name: "Travis",
        species: "chimpanzee",
        diet: "herbivore",
        personalityTraits: ["anxious", "goofy"],
    };

    const invalidAnimal = {
        id: "1",
        name: "Travis",
        species: "chimpanzee",
        diet: "herbivore",
    };

    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});