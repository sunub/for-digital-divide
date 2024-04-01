const readline = require("readline");

function solution(map, m, n, k) {
    class Dice {
        constructor() {
            this.face = {
                top: 1,
                btm: 6,
                east: 3,
                west: 4,
                north: 2,
                south: 5,
            };
        }

        east() {
            const diceDir = { ...this.face };
            this.face.btm = diceDir.east;
            this.face.top = diceDir.west;
            this.face.east = diceDir.top;
            this.face.west = diceDir.btm;
        }

        west() {
            const diceDir = { ...this.face };
            this.face.btm = diceDir.west;
            this.face.top = diceDir.east;
            this.face.east = diceDir.btm;
            this.face.west = diceDir.top;
        }

        north() {
            const diceDir = { ...this.face };
            this.face.btm = diceDir.north;
            this.face.top = diceDir.south;
            this.face.south = diceDir.btm;
            this.face.north = diceDir.top;
        }

        south() {
            const diceDir = { ...this.face };
            this.face.btm = diceDir.south;
            this.face.top = diceDir.north;
            this.face.south = diceDir.top;
            this.face.north = diceDir.btm;
        }
    }

    let TOTAL_POINTS = 0;
    let CURR_DIR = "east";
    const DIR_MOVE = {
        east: [0, 1],
        west: [0, -1],
        south: [1, 0],
        north: [-1, 0],
    };
    let POSITION = [0, 0];
    let ROTATE_DIR = {
        curr: "east",
        left: "north",
        right: "south",
        top: "west",
    };
    const dice = new Dice();

    for (let i = 0; i < k; i++) {
        rollTheDice(map, m, n);
    }

    console.log(TOTAL_POINTS);

    /**
     *
     * @param {number[][]} map
     */
    function rollTheDice(map, m, n) {
        moveDice();

        const [x, y] = POSITION;
        const diceBtm = dice.face.btm;
        const mapBtm = map[x][y];

        TOTAL_POINTS += getPoint();
        rotateDir();
        return TOTAL_POINTS;

        function getPoint() {
            return bfs(x, y, mapBtm, new Set()) * mapBtm;
        }

        function rotateDir() {
            if (diceBtm > mapBtm) {
                rotateClock();
            } else if (diceBtm < mapBtm) {
                rotateReverseClock();
            }
            CURR_DIR = ROTATE_DIR.curr;
        }

        function rotateClock() {
            const copyDir = { ...ROTATE_DIR };
            ROTATE_DIR = {
                curr: copyDir.right,
                left: copyDir.curr,
                right: copyDir.top,
                top: copyDir.left,
            };
        }

        function rotateReverseClock() {
            const copyDir = { ...ROTATE_DIR };
            ROTATE_DIR = {
                curr: copyDir.left,
                left: copyDir.top,
                right: copyDir.curr,
                top: copyDir.right,
            };
        }

        function moveDice() {
            let [dx, dy] = DIR_MOVE[CURR_DIR];
            const [cx, cy] = POSITION;

            let isChanged = false;
            if (cx + dx < 0 || cx + dx >= m || cy + dy < 0 || cy + dy >= n) {
                [ROTATE_DIR.curr, ROTATE_DIR.top] = [
                    ROTATE_DIR.top,
                    ROTATE_DIR.curr,
                ];
                [ROTATE_DIR.left, ROTATE_DIR.right] = [
                    ROTATE_DIR.right,
                    ROTATE_DIR.left,
                ];
                isChanged = true;
            }

            if (isChanged) CURR_DIR = ROTATE_DIR.curr;

            [dx, dy] = DIR_MOVE[CURR_DIR];
            POSITION = [cx + dx, cy + dy];
            dice[CURR_DIR]();
        }

        function bfs(x, y, target, visit) {
            let result = 0;
            const queue = [[x, y]];
            const dir = [
                [0, 1],
                [0, -1],
                [1, 0],
                [-1, 0],
            ];

            while (queue.length) {
                const [cx, cy] = queue.shift();

                for (const [dx, dy] of dir) {
                    const [nx, ny] = [cx + dx, cy + dy];
                    const key = `${nx},${ny}`;

                    if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
                    if (visit.has(key) || map[nx][ny] !== target) continue;

                    visit.add(key);
                    queue.push([nx, ny]);
                    result += 1;
                }
            }

            result = result === 0 ? 1 : result;
            return result;
        }
    }
}

const input = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    const [m, n, k] = input[0].split(" ").map(Number);
    const map = input.slice(1).map((line) => line.split(" ").map(Number));

    solution(map, m, n, k);

    process.exit();
});

// solution(
//     [
//         [4, 1, 2, 3, 3],
//         [6, 1, 1, 3, 3],
//         [5, 6, 1, 3, 2],
//         [5, 5, 6, 5, 5],
//     ],
//     4,
//     5,
//     1000
// );
