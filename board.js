
function create_Grid(gridSize) {
    let grid = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
        grid[i][j] = EMPTY;
        }
    }
    return grid
}

function create_Headers(gridSize) {     //Los cabeceros de las columnas
    let result = ' |  ';
    for (let i = 65; i < gridSize + 65; i++) {
        result += String.fromCharCode(i) + '  |  ';
    }
    return ' | (INDEX)' + result
}

export const EMPTY = ' -  |';
export const gridSize = 10; //Tamaño del tablero
export const playerAGrid = create_Grid(gridSize);
export const playerBGrid = create_Grid(gridSize);