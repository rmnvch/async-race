const messages = [
    'Bummer!!!',
    'Why me??!',
    '@#$%$#!!!',
    "I'm so screwed!!!",
    'Aaaaaaa!!!',
    'Not again!!',
    'LOL',
    "I'm fine!",
    'AGHHHHH!!!',
    'Ooops!',
];

export const createRandomStopMessage = () => {
    return messages[Math.floor(Math.random() * messages.length)];
};
