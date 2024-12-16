type Board = (string | null)[];
type Difficulty = 'easy' | 'medium' | 'hard';

const evaluateBoard = (board: Board, depth: number): number => {
  const { winner } = calculateWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  return 0;
};

const getEmptySquares = (board: Board): number[] => {
  return board.reduce<number[]>((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
};

const calculateWinner = (squares: Board): { winner: string | null; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
};

const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean
): { score: number; move: number | null } => {
  const { winner } = calculateWinner(board);
  const emptySquares = getEmptySquares(board);

  if (winner || emptySquares.length === 0) {
    return { score: evaluateBoard(board, depth), move: null };
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (const move of emptySquares) {
      const newBoard = [...board];
      newBoard[move] = 'O';
      const { score } = minimax(newBoard, depth + 1, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove = null;

    for (const move of emptySquares) {
      const newBoard = [...board];
      newBoard[move] = 'X';
      const { score } = minimax(newBoard, depth + 1, true);
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return { score: bestScore, move: bestMove };
  }
};

const getRandomMove = (board: Board): number => {
  const emptySquares = getEmptySquares(board);
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};

export const getBestMove = (board: Board, difficulty: Difficulty): number => {
  const emptySquares = getEmptySquares(board);
  
  switch (difficulty) {
    case 'easy':
      // 20% chance of making the best move, 80% random
      return Math.random() < 0.2 
        ? minimax(board, 0, true).move ?? emptySquares[0]
        : getRandomMove(board);
    
    case 'medium':
      // 60% chance of making the best move, 40% random
      return Math.random() < 0.6
        ? minimax(board, 0, true).move ?? emptySquares[0]
        : getRandomMove(board);
    
    case 'hard':
      // Always make the best move
      return minimax(board, 0, true).move ?? emptySquares[0];
    
    default:
      return getRandomMove(board);
  }
};