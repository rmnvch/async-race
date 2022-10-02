const adjectives: Array<string> = [
    'Amusing',
    'Hilarious',
    'Speedy',
    'Scary',
    'Hysterical',
    'Easy-going',
    'Humble',
    'Naughty',
    'Nerdy',
    'Nervous',
    'Outrageous',
    'Poetic',
    'Accurate',
    'Catchy',
    'Famous',
    'Fanatic',
    'Lazy',
    'Handsome',
    'Flirty',
    'Cocky',
    'Wholesome',
    'Modest',
    'Shy',
    'Curious',
    'Smart',
    'Easy-going',
];

const names: Array<string> = [
    'Amanda',
    'Andy',
    'Ben',
    'Bruce',
    'Betty',
    'Dick',
    'Drew',
    'Harry',
    'Larry',
    'Marco',
    'Henry',
    'Jenny',
    'Kenny',
    'Mike',
    'Oliver',
    'Peter',
    'Phil',
    'Ron',
    'Seymour',
    'Stella',
    'Willie',
    'Bob',
];

export const createName = (name?: string): string => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    if (!name) {
        const randomName = names[Math.floor(Math.random() * names.length)];
        return randomAdjective + ' ' + randomName;
    }

    return randomAdjective + ' ' + name;
};
