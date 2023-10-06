import { checkWin, isInvalidMove } from "./game-logic";


describe('checkWin', () => {
  it('should return 0 if there is no winner', () => {
    const field = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
    expect(checkWin(field)).toEqual(0);
  });

  it('should return 1 if the first player wins horizontally', () => {
    const field = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0]
    ];
    expect(checkWin(field)).toEqual(1);
  });

  it('should return 2 if the O player wins vertically', () => {
    const field = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    expect(checkWin(field)).toEqual(2);
  });

  it('should return 1 if the X player wins diagonal-left', () => {
    const field = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 2, 0],
      [0, 0, 0, 0, 2, 1, 2],
      [0, 0, 0, 0, 0, 2, 1]
    ];
    expect(checkWin(field)).toEqual(1);
  });

  it('should return 2 if the O player wins diagonal-right', () => {
    const field = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0],
      [0, 1, 2, 0, 0, 0, 0],
      [1, 2, 1, 0, 0, 0, 0],
      [2, 1, 0, 0, 0, 0, 0]
    ];
    expect(checkWin(field)).toEqual(2);
  });
});

describe('isInvalidMove', () => {
  it('should return false if the move is valid', () => {
    const field = [
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];
    expect(isInvalidMove(field, 1)).toEqual(false);
  });

  it('should return true if the move is invalid', () => {
    const field = [
      [2, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ];
    expect(isInvalidMove(field, 1)).toEqual(true);
  });
});
