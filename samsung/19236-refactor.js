const fs = require('fs');
const path = require('path');

const submitPath = '/dev/stdin';
const localPath = path.join(process.cwd(), '/baekjoon/example.txt');

// const input = fs.readFileSync(localPath).toString().split(' ').map(Number);
const input = fs.readFileSync(localPath).toString().trim().split('\n');
const DATA = input.map((v) => v.split(' ').map(Number));

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

class Fish {
    constructor(dir, y, x, eated = false) {
        this.dir = dir;
        this.x = x;
        this.y = y;
        this.eated = eated;
    }

    clone() {
        return new Fish(this.dir, this.x, this.y, this.eated);
    }
}

function solution(data) {
    const grid = Array.from(Array(4), () => Array(4));
    const fishes = Array(16);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const num = data[i][j * 2];
            fishes[num - 1] = new Fish(data[i][j * 2 + 1] - 1, i, j);
            grid[i][j] = num - 1;
        }
    }

    function playTheGame(fishes, space, sharkX, sharkY, sum) {
        const tmpFishes = fishes.map((f) => f.clone());
        const tmpSpace = space.map((s) => s.slice());

        for (let i = 0; i < 16; i++) {
            if (fishes[i].eated) continue;

            const currFish = tmpFishes[i];
            const [cy, cx] = [currFish.y, currFish.x];
            let dir = currFish.dir;
            let [dy, dx] = DIR[dir];

            let [ny, nx] = [cy + dy, cx + dx];
            while (
                nx < 0 ||
                nx >= 4 ||
                ny < 0 ||
                ny >= 4 ||
                (nx === sharkX && ny === sharkY)
            ) {
                dir = dir + 1 > 8 ? 1 : dir + 1;
                [dy, dx] = DIR[dir];
                [ny, nx] = [cy + dy, cx + dx];
            }

            const nextFishNum = tmpSpace[ny][nx];
            if (nextFishNum !== -1) {
                const nextFish = tmpFishes[nextFishNum];
                [nextFish.y, nextFish.x] = [cy, cx];
                tmpSpace[cy][cx] = nextFishNum;
            } else {
                tmpSpace[cy][cx] = -1;
            }

            [tmpFishes[i].x, tmpFishes[i].y] = [nx, ny];
            tmpFishes[i].dir = dir;
            tmpSpace[ny][nx] = i;
        }

        console.log(tmpSpace);
    }

    playTheGame(fishes, grid, 0, 0, 0);
}

solution(DATA);
