const readline = require('readline');

const printField = field => {
  //check field
  if (
    field.length !== 6 ||
    field.map(x => x.length === 7).reduce((val, acc) => val + acc) !== 6
  ) {
    throw 'Field has wrong dimensions!';
  }

  let outStr = '┌─────────────┐\n';
  for (const row of field) {
    let rowStr = '│';
    for (const col of row) {
      rowStr += `${col === 0 ? ' ' : col === 1 ? 'x' : 'o'}│`;
    }
    outStr += rowStr + '\n';
  }
  outStr += '└─────────────┘\n';
  console.log(outStr);
};

const readInput = (player = 1) => {
  return new Promise(resolve => {
    let playerSymbol = player === 1 ? 'x' : 'o';
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(
      `Player ${playerSymbol}: Please insert a column, where you want to insert a disc (1-7).`,
      answer => {
        rl.close();
        const val = parseInt(answer);
        if (val > 0 && val < 8) {
          resolve(val);
        } else {
          console.error('Invalid input! Plese use a number between 1 and 7');
          readInput(player).then(nval => resolve(nval));
        }
      }
    );
  });
};

const updateField = (field, player, column) => {
  /* A player wants to insert a disc in a column.*/

  /* Your code here*/
  if (field[0][column - 1] !== 0) {
    return null;
  }

  for (let row = 5; row >= 0; row--) {
    if (field[row][column - 1] === 0) {
      field[row][column - 1] = player;
      break;
    }
  }

  return field;
};

const checkWin = field => {
  let win = 0;
  /* Given a field, check if a player has won */

  /* Your code here*/
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (field[row][col] === 0) continue;

      // Horizontal
      if (
        col + 3 < 7 &&
          field[row][col] === field[row][col + 1] &&
          field[row][col] === field[row][col + 2] &&
          field[row][col] === field[row][col + 3]
          ) return field[row][col];

      // Vertical
      if (row + 3 < 6 &&
          field[row][col] === field[row + 1][col] &&
          field[row][col] === field[row + 2][col] &&
          field[row][col] === field[row + 3][col]) return field[row][col];

      // Diagonal right-down
      if (row + 3 < 6 && col + 3 < 7 &&
          field[row][col] === field[row + 1][col + 1] &&
          field[row][col] === field[row + 2][col + 2] &&
          field[row][col] === field[row + 3][col + 3]) return field[row][col];

      // Diagonal left-down
      if (row + 3 < 6 && col - 3 >= 0 &&
          field[row][col] === field[row + 1][col - 1] &&
          field[row][col] === field[row + 2][col - 2] &&
          field[row][col] === field[row + 3][col - 3]) return field[row][col];
    }
  }

  return win;
};

const game = async () => {
  let field = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

  printField(field);
  let player = 1;
  let wrongTurns = 0;

  while (true) {
    let column = await readInput(player);

    /* Your code here */
    const newField = updateField(field, player, column);
    if (newField !== null) {
      wrongTurns = 0;
      field = newField;
      /* Your code here */
      printField(field);
      const winner = checkWin(field);
      if (winner !== 0) {
        console.log(`Player ${winner === 1 ? 'x' : 'o'} wins!`);
        break;
      }
      // Switch player
      player = 3 - player;
    }
    else {
      console.log('The cell is already occupied.');
      wrongTurns++;
      if (wrongTurns === 3) {
        console.warn('Please dont make this again.')
      }
    }
  }
};

const test = () => {
  let errors = 0;
  [
    {
      field: [
        [1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      win: 1
    },
    {
      field: [
        [0, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      win: 1
    },
    {
      field: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      win: 1
    },
    {
      field: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      win: 1
    },
    {
      field: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1]
      ],
      win: 1
    },
    {
      field: [
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      win: 0
    },
    {
      field: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1]
      ],
      win: 0
    }
  ].map(({ field, win }, i) => {
    if (checkWin(field) !== win) {
      errors++;
      console.error(`Test ${i + 1} failed.`);
    } else {
      console.log(`Test ${i + 1} passed.`);
    }
  });

  if (!errors) {
    console.log('all tests passed');
  }
};

test();

game();
