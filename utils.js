import usePrinter from './printer.js';
const { printHeading, printLine, print_Grid } = usePrinter();
import { playerA, playerB } from './data.js';

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const printTitle = (tittle) => {
    console.log();
    printHeading(`${tittle}`);
    console.log(`                        By Javier Girón López`);
    console.log();
};

export const toDead = () => {
    let dead;

    playerA.life <= 0 || playerB.life <= 0 ? (dead = true) : (dead = false);

    return dead;
};

export const toWin = () => {
    let totalShoots = playerA.shoots + playerB.shoots;
    switch (totalShoots <= 200) {
        case playerA.life > playerB.life:
            return playerB.name;
            break;
        case playerA.life < playerB.life:
            return playerA.name;
            break;
        default:
            return "Sorry, this is a tie!! There isn't any winner. Try again.";
    }
};
