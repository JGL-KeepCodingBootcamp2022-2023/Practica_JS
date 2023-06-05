function create_Grid(gridSize) {
    let grid = [];
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = EMPTY;
        }
    }
    return grid;
}

export const EMPTY = ' -  |';

export const gridSize = 10;

export const playerAGrid = create_Grid(gridSize);
export const playerBGrid = create_Grid(gridSize);
