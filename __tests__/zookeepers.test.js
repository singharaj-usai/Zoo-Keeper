const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock("fs");

test("creates an zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "jhgdja3ng2" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Bob",
            age: 17,
            favoriteAnimal: "penguin",
        },
        {
            id: "2",
            name: "Adam",
            age: 31,
            favoriteAnimal: "bear",
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 17 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "1",
            name: "Bob",
            age: 17,
            favoriteAnimal: "penguin",
        },
        {
            id: "2",
            name: "Adam",
            age: 31,
            favoriteAnimal: "bear",
        },
    ];

    const result = findById("2", startingZookeepers);

    expect(result.name).toBe("Adam");
});

test("validates age", () => {
    const zookeeper = {
        id: "1",
        name: "Bob",
        age: 17,
        favoriteAnimal: "penguin",
    };

    const invalidZookeeper = {
        id: "2",
        name: "Adam",
        age: 31,
        favoriteAnimal: "bear",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});