let enemy = {
    vida: 9,
    shootsLog: [
        [0, 0],
        [2, 8],
        [6, 3],
        [5, 6],
        [5, 8],
    ],
};

let shootCoord = [6,3];

let find = enemy.shootsLog.findIndex((el) => el[0] === shootCoord[0] && el[1] === shootCoord[1]);

console.log(find)