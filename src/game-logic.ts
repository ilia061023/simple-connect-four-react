export const isInvalidMove = (field: number[][], column: number): boolean => {
    return field[0][column - 1] !== 0;
};

export const updateField = (field: number[][], column: number, player: number): number[][] => {
    const rows = field.length;
    for (let row = rows - 1; row >= 0; row--) {
        if (field[row][column - 1] === 0) {
            field[row][column - 1] = player;
            break;
        }
    }
    return [...field];
};

export const checkWin = (field: number[][]) => {
    const rows = field.length;
    const cols = field[0].length;
    const directions = [
        [0, 1],  // Horizontal
        [1, 0],  // Vertical
        [1, 1],  // Diagonal down-right
        [1, -1]  // Diagonal up-right
    ];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (field[row][col] === 0) continue;

            for (const [dx, dy] of directions) {
                let x = row;
                let y = col;

                for (let step = 0; step < 3; step++) {
                    x += dx;
                    y += dy;

                    if (x < 0 || x >= rows || y < 0 || y >= cols) break;
                    if (field[row][col] !== field[x][y]) break;
                    if (step === 2) return field[row][col];
                }
            }
        }
    }

    return 0;
};
