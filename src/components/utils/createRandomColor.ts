const chars = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function createRandomColor() {
    let res = '#';
    for (let i = 1; i <= 6; i += 1) {
        res += chars[Math.ceil(Math.random() * (chars.length - 1))];
    }
    return res;
}
