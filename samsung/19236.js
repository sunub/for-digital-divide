const fs = require('fs');
const path = require('path');

const submitPath = '/dev/stdin';
const localPath = path.join(process.cwd(), '/baekjoon/example.txt');

// const input = fs.readFileSync(localPath).toString().split(' ').map(Number);
const input = fs.readFileSync(localPath).toString().split('\n');

const DIR = {
    1: [-1, 0],
    2: [-1, -1],
    3: [0, -1],
    4: [1, -1],
    5: [1, 0],
    6: [1, 1],
    7: [0, 1],
    8: [-1, 1],
};

const initFishes = new Map();
const grid = [];

for (let i = 0; i < input.length; i++) {
    const row = input[i].split(' ').map(Number);
    const arr = [];
    let col = 0;
    for (let j = 0; j < row.length; j += 2) {
        arr.push(row[j]);
        initFishes.set(row[j], {
            dir: row[j + 1],
            pos: [i, col],
        });
        col += 1;
    }
    grid.push(arr);
}

const orders = Array.from({ length: 16 }, (_, i) => i + 1);

function checkIsValidRange(y, x) {
    if (y < 0 || y >= 4 || x < 0 || x >= 4) {
        return false;
    }
    return true;
}

function rotate45Deg(ny, nx, cy, cx, dir, space) {
    if (!checkIsValidRange(ny, nx) || space[ny][nx] === 1000) {
        const nextDir = dir + 1 > 8 ? 1 : dir + 1;
        let [dy, dx] = DIR[nextDir];
        return rotate45Deg(cy + dy, cx + dx, cy, cx, nextDir, space);
    }
    return [ny, nx, dir];
}

function fishTurn(space, fishes) {
    for (const order of orders) {
        if (!fishes.has(order)) continue;
        const fish = fishes.get(order);
        let { dir, pos } = fish;

        const [cy, cx] = pos;
        let [dy, dx] = DIR[dir];
        let [ny, nx] = [cy + dy, cx + dx];
        [ny, nx, dir] = rotate45Deg(ny, nx, cy, cx, dir, space);

        const currFish = space[cy][cx];
        const nextFish = space[ny][nx];

        if (nextFish !== 0) {
            fishes.set(nextFish, {
                dir: fishes.get(nextFish).dir,
                pos,
            });
        }
        fishes.set(currFish, {
            dir,
            pos: [ny, nx],
        });

        [space[cy][cx], space[ny][nx]] = [space[ny][nx], space[cy][cx]];
    }
}

function sharkTurn(cy, cx, space, cost, maxCost, fishes) {
    if (space[cy][cx] === 0 || !checkIsValidRange(cy, cx)) {
        return Math.max(cost, maxCost);
    }

    const eatenFish = fishes.get(space[cy][cx]);
    const eatenFishCost = space[cy][cx];
    fishes.delete(space[cy][cx]);
    space[cy][cx] = 1000;

    let sharkDir = eatenFish.dir;
    const [dy, dx] = DIR[sharkDir];

    for (let i = 1; i < 4; i++) {
        const tmpSpace = JSON.parse(JSON.stringify(space));

        const [ny, nx] = [cy + dy * i, cx + dx * i];
        let tmpFishes = new Map(fishes);
        fishTurn(tmpSpace, tmpFishes);

        if (!checkIsValidRange(ny, nx) || tmpSpace[ny][nx] === 0) continue;
        tmpSpace[cy][cx] = 0;

        maxCost = Math.max(
            maxCost,
            sharkTurn(
                ny,
                nx,
                tmpSpace,
                cost + eatenFishCost,
                maxCost,
                tmpFishes
            )
        );
    }

    return Math.max(cost + eatenFishCost, maxCost);
}

function solution() {
    const space = [...grid];
    const fishes = new Map(initFishes);
    const answer = sharkTurn(0, 0, space, 0, -Infinity, fishes);
    console.log(answer);
}

solution();
