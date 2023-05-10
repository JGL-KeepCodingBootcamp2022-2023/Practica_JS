import usePrinter from './printer.js';
const { printHeading, printLine, print_Grid } = usePrinter();

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const printTitle = (tittle, developer) => {
    console.log();
    printHeading(`${tittle}`);
    console.log(`                        By ${developer}`);
    console.log();
};
