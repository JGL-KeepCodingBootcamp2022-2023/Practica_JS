import usePrinter from './printer.js';
const { printHeading, printLine, print_Grid } = usePrinter();
import { playerA, playerB } from './data.js';
import { gridSize } from './board.js';

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const printTitle = (tittle) => {
    console.log();
    printHeading(`${tittle}`);
    console.log(`                        By Javier Girón López`);
    console.log();
};

export const toDead = (shootsNumber) => {
    let dead;
    if (playerA.shoots == shootsNumber|| playerB.shoots == shootsNumber) {
        dead = true;
    } else {
        playerA.life <= 0 || playerB.life <= 0 ? (dead = true) : (dead = false);
    }

    return dead;
};

export const toWin = (gridSize) => {
    let totalShoots = playerA.shoots + playerB.shoots;
    switch (totalShoots <= gridSize * 20) {
        case playerA.life > playerB.life:
            if (playerB.life == 0) {
                return playerA.name + ' by KO!!!';
            } else {
                return playerA.name;
            }

        case playerA.life < playerB.life:
            if (playerA.life == 0) {
                return playerB.name + ' by KO!!!';
            } else {
                return playerB.name;
            }
        case playerA.life == playerB.life:
            if (playerA.sunkenShips < playerB.sunkenShips) {
                return playerA.name;
            } else if (playerB.sunkenShips < playerA.sunkenShips) {
                return playerB.name;
            } else {
                break;
            }
        default:
            return "Sorry, this is a tie!! There isn't any winner. Try again.";
    }
};

export const showResults = () => {

    let shipsAfloatA = playerA.ships.length - playerA.sunkenShips;
    let shipsAfloatB = playerB.ships.length - playerB.sunkenShips;
    if (playerA.life > 0 || playerB.life > 0) {
        console.log();
        printHeading('FINAL RESULTS');

        printLine(`${playerA.name} results`);
        console.log();
        console.log(`${playerA.name} has ${shipsAfloatA} ships afloat`);
        console.log();
        print_Grid(playerA.grid);

        printLine(`${playerB.name} results`);
        console.log();
        console.log(`${playerB.name} has ${shipsAfloatB} ships afloat`);
        print_Grid(playerB.grid);
        console.log();
    }
};
