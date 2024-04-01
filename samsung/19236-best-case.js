const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const DATA = input.map((_) => _.split(' ').map(Number));

const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
const dy = [0, -1, -1, -1, 0, 1, 1, 1];

class Fish {
    constructor(dir, x, y, eated = false) {
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
    let answer = 0;
    let map = Array.from(Array(4), () => Array(4));
    let fishes = Array(16);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const num = data[i][j * 2];
            fishes[num - 1] = new Fish(data[i][j * 2 + 1] - 1, i, j);
            map[i][j] = num - 1;
        }
    }

    const dfs = (pFishes, pMap, sx, sy, sum) => {
        const copyFishes = pFishes.map((_) => _.clone());
        const copyMap = pMap.map((_) => _.slice());

        const fishNum = copyMap[sx][sy];
        const sd = copyFishes[fishNum].dir;
        copyFishes[fishNum].eated = true;
        copyMap[sx][sy] = -1;

        sum += fishNum + 1;
        answer = Math.max(answer, sum);

        for (let i = 0; i < 16; i++) {
            if (copyFishes[i].eated) continue;
            const curFish = copyFishes[i];
            const [cx, cy] = [curFish.x, curFish.y];
            let nd = curFish.dir;
            let [nx, ny] = [cx + dx[nd], cy + dy[nd]];
            while (
                nx < 0 ||
                nx >= 4 ||
                ny < 0 ||
                ny >= 4 ||
                (nx === sx && ny === sy)
            ) {
                nd = (nd + 1) % 8;
                [nx, ny] = [curFish.x + dx[nd], curFish.y + dy[nd]];
            }

            if (copyMap[nx][ny] !== -1) {
                const targetNum = copyMap[nx][ny];
                [copyFishes[targetNum].x, copyFishes[targetNum].y] = [cx, cy];
                copyMap[cx][cy] = targetNum;
            } else {
                copyMap[cx][cy] = -1;
            }
            [copyFishes[i].x, copyFishes[i].y] = [nx, ny];
            copyFishes[i].dir = nd;
            copyMap[nx][ny] = i;
        }

        for (let i = 1; i < 4; i++) {
            const [nx, ny] = [sx + dx[sd] * i, sy + dy[sd] * i];
            if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) break;
            if (copyMap[nx][ny] !== -1) dfs(copyFishes, copyMap, nx, ny, sum);
        }
    };

    dfs(fishes, map, 0, 0, 0);

    return answer;
}

console.log(solution(DATA));
