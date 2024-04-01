const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const map = Array.from({ length: N }, (_, i) =>
    input[i + 1].split(" ").map(Number)
);
const dy = [0, 1, 0, -1]; //동 남 서 북
const dx = [1, 0, -1, 0];
const [EAST, SOUTH, WEST, NORTH] = [0, 1, 2, 3];
const isValidPos = (y, x) => y >= 0 && x >= 0 && y < N && x < M;

const throwDice = (dice, dir) => {
    switch (dir) {
        case EAST: {
            [dice[1], dice[5]] = [dice[5], dice[1]];
            [dice[1], dice[0]] = [dice[0], dice[1]];
            [dice[0], dice[2]] = [dice[2], dice[0]];
            break;
        }
        case SOUTH: {
            // 윗면 동 서 남 북 아랫면
            [dice[3], dice[5]] = [dice[5], dice[3]];
            [dice[3], dice[0]] = [dice[0], dice[3]];
            [dice[0], dice[4]] = [dice[4], dice[0]];
            break;
        }
        case WEST: {
            [dice[2], dice[5]] = [dice[5], dice[2]];
            [dice[2], dice[0]] = [dice[0], dice[2]];
            [dice[0], dice[1]] = [dice[1], dice[0]];
            break;
        }
        case NORTH: {
            [dice[4], dice[5]] = [dice[5], dice[4]];
            [dice[4], dice[0]] = [dice[0], dice[4]];
            [dice[0], dice[3]] = [dice[3], dice[0]];
            break;
        }
    }
};
const getScore = (y, x, number, scoreMap) => {
    let count = 0;
    scoreMap[y][x] = 1;
    let queue = [[y, x]];
    let startIndex = 0,
        endIndex;
    while (startIndex !== queue.length) {
        endIndex = queue.length;
        for (let i = startIndex; i < endIndex; i++) {
            const [cy, cx] = queue[i];
            count++;
            for (let dir = 0; dir < 4; dir++) {
                const [ny, nx] = [cy + dy[dir], cx + dx[dir]];
                if (
                    !isValidPos(ny, nx) ||
                    map[ny][nx] !== number ||
                    scoreMap[ny][nx]
                )
                    continue;
                queue.push([ny, nx]);
                scoreMap[ny][nx] = 1;
            }
        }
        startIndex = endIndex;
    }
    queue.forEach(([y, x]) => (scoreMap[y][x] = count * number));
    return scoreMap[y][x];
};
const nextDir = (bottomDice, mapNumber, dir) => {
    if (bottomDice > mapNumber) return (dir + 5) % 4;
    else if (bottomDice < mapNumber) return (dir + 3) % 4;
    else return dir;
};

const solution = (K) => {
    let dice = [1, 3, 4, 5, 2, 6]; // 윗면 동 서 남 북 아랫면
    let [y, x, dir] = [0, 0, EAST];
    let sum = 0;
    let scoreMap = Array.from({ length: N }, () => Array(M).fill(0));
    // 주사위 아랫면 숫자 A 와 map[y][x] B    A>B -> dir+1  A<B -> dir-1  A=B dir
    // 도착한후 Bfs 로 이동가능한 곳 의 숫자와 map[y][x] 를 곱함 // dp 필요함
    while (K--) {
        const [ny, nx] = [y + dy[dir], x + dx[dir]];
        if (!isValidPos(ny, nx)) {
            dir = (dir + 2) % 4;
            [y, x] = [y + dy[dir], x + dx[dir]];
        } else (y = ny), (x = nx);
        throwDice(dice, dir);
        dir = nextDir(dice[5], map[y][x], dir);
        if (scoreMap[y][x]) sum += scoreMap[y][x];
        else sum += getScore(y, x, map[y][x], scoreMap);
    }
    console.log(sum);
};
solution(K);
