
import { LANCHA, CRUCERO, SUBMARINO, BUQUE, PORTAAVIONES } from '../data/data.js';
import { EMPTY } from '../board/board.js';

export default function usePrinter() {
    const LINEAINFERIOR = [
        '  _________',
        '______',
        '______',
        '______',
        '______',
        '______',
        '______',
        '______',
        '______',
        '___',
    ];
    const LINEAINFERIOR1 = [
        ' |\t   ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
        '     |',
    ];
    const LINEAINFERIOR2 = [
        ' |_________',
        '_____',
        '_____',
        '_____',
        '_____',
        '_____',
        '_____',
        '_____',
        '_____',
        '_____',
        '_____|',
    ];

    function printHeading(text) {
        const pad = '='.repeat(text.length);
        console.log();
        console.log(`==========${pad}==========`);
        console.log(`========= ${text} =========`);
        console.log(`==========${pad}==========`);
    }
    function printLine(text) {
        const pad = '='.repeat(text.length);
        console.log();
        console.log(text);
        console.log(`${pad}`);
    }

    /* Print the board by entering the board parameter and whether it is the board of player A or Player B. In the first one you can see the ships and in the second one you cannot see the ships. */
    function print_Grid(grid, isEnemy = false) {
        const headers = create_Headers(grid.length);
        console.log(LINEAINFERIOR.join('_'));
        console.log(LINEAINFERIOR1.join('|'));
        console.log(headers);
        console.log(LINEAINFERIOR2.join('|'));
        for (let i = 0; i < grid.length; i++) {
            let rowStr = ' |    ' + i + '    | '; // Heads of the rows
            for (let cell of grid[i]) {
                if (
                    (isEnemy && cell == LANCHA.figure) ||
                    (isEnemy && cell == CRUCERO.figure) ||
                    (isEnemy && cell == SUBMARINO.figure) ||
                    (isEnemy && cell == BUQUE.figure) ||
                    (isEnemy && cell == PORTAAVIONES.figure)
                ) {
                    rowStr += EMPTY + ' ';
                } else {
                    rowStr += cell + ' ';
                }
            }
            console.log(LINEAINFERIOR1.join('|'));
            console.log(rowStr);
            console.log(LINEAINFERIOR2.join('|'));
        }
    }

    function create_Headers(size) {
        //Column headers
        let result = ' |  ';
        for (let i = 65; i < size + 65; i++) {
            result += String.fromCharCode(i) + '  |  ';
        }
        return ' | (INDEX)' + result;
    }
    return {
        printHeading,
        printLine,
        print_Grid,
    };
}
