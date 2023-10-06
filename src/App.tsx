import React, { useState } from 'react';
import './App.css';
import { checkWin, isInvalidMove, updateField } from './game-logic';

interface CellProperties {
  value: number;
  columnIndex: number;
  handleColumnInput: (column: number) => void;
}

interface BoardProperties {
  field: number[][];
  handleColumnInput: (column: number) => void;
}

interface ValueProperties {
  text: string;
  color: string;
}

let invalidMoves = 0;

const Cell: React.FC<CellProperties> = ({ value, columnIndex, handleColumnInput }) => {

  const renderValue = (): ValueProperties => {
    switch (value) {
      case 1: return { text: 'X', color: '#289bd3' };
      case 2: return { text: 'O', color: '#d92229' };
      default: return { text: ' ', color: '#fff' };
    }
  };

  const valueObj = renderValue();

  return (
      <div
          className="Cell"
          onClick={() => handleColumnInput(columnIndex)}
          data-testid={`cell-${columnIndex}`}
      >
        <h1 style={{ color: valueObj.color }}>
          {valueObj.text}
        </h1>
      </div>
  );
};

const Board: React.FC<BoardProperties> = ({ field, handleColumnInput }) => {
  return (
      <div className="Column">
        {field.map((row: number[], rowIndex: number) => (
            <div className="Row" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                  <Cell
                      key={cellIndex}
                      value={cell}
                      columnIndex={cellIndex + 1}
                      handleColumnInput={handleColumnInput}
                  />
              ))}
            </div>
        ))}
      </div>
  );
};

const App = () => {
  const [field, setField] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]);
  const [player, setPlayer] = useState(1);

  const handlePlayerInput = (column: number) => {

    if (isInvalidMove(field, column)) {
      if (invalidMoves >= 3) {
        alert('****!.. The column is ***** occupied!');
      } else {
        alert('The column is occupied!');
      }
      invalidMoves++;
      return;
    }

    invalidMoves = 0;
    setField(updateField(field, column, player));
    const winner = checkWin(field);
    if (winner) {
      alert(`Player ${winner === 1 ? 'X' : 'O'} wins!`);
    } else {
      setPlayer(player === 1 ? 2 : 1);
    }
  };

  return (
      <div>
        <h1>Connect Four</h1>
        <div>
          <Board
              field={field}
              handleColumnInput={handlePlayerInput}
          />
        </div>
      </div>
  );
};

export default App;
