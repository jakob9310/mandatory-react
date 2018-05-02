// ---------- A tictactoe gaming library! ------------

/*
A game is an object with...
- state: a string describing the current state:
  - 'plr1': It is player 1's turn to play
  - 'plr2': It is player 2's turn to play
  - 'plr1won': Game over, the first player won
  - 'plr2won': Game over, the second player won
  - 'draw': Game over, nobody won
- board: An array of 9 numbers, each of which are either:
  - 0: An empty square
  - 1: Player 1 has a marker here
  - 2: Player 2 has a marker here
- line: an array of all positions involved in the win, otherwise empty array (STRETCH TASK)

The board array goes from top left to bottom right. For example, the array
[0,1,2,1,2,0,1,0,2] represents this board:

  .---.---.---.
  |   | 1 | 2 |
  |---+---+---|
  | 1 | 2 |   |
  |---+---+---|
  | 1 |   | 2 |
  '---'---'---'
*/

/*
The newGame function will return a valid new game object.
*/
export const newGame = () => ({
  state: 'plr1',
  board: [0,0,0,0,0,0,0,0,0],
  line: []
});

/*
The makeMove function should be called with...
- game: A valid game object
- pos: A number 0-8 corresponding to where we want to play

It will return a new game object. If the move was invalid
(because the position was already taken or the game is over),
an unchanged game will be returned.
*/

const winPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

export const makeMove = (game, pos) => {
    // Is there already a piece here?
    if (game.board[pos] !== 0) {
        return game
    }
    // Do we already have a winner winner chicken dinner?!
    if (game.state !== "plr1" && game.state !== "plr2") {
        return game
    }

    game.board[pos] = game.state === "plr1" ? 1 : 2

    game.state = getState(game.board, game.state)

    if (game.state === "plr1won" || game.state === "plr2won") {
        game.line = getLine(game.board)
    } else {
        game.line = []
    }

    return game
}

export const getState = (board, currentState) => {
    for (var i in winPatterns) {
        var winPattern = winPatterns[i]
        var piecesOnWinPattern = [board[winPattern[0]], board[winPattern[1]], board[winPattern[2]]]
            .filter((value, index, self) => {
                return self.indexOf(value) === index
            })

        if (piecesOnWinPattern.length > 1) {
            continue;
        }

        if (piecesOnWinPattern[0] === 1) {
            return "plr1won"
        }

        if (piecesOnWinPattern[0] === 2) {
            return "plr2won"
        }
    }

    var boardIsFull = board.filter(piece => {
        return piece === 0;
    }).length === 0;

    if (boardIsFull) {
        return "draw"
    }

    return currentState === "plr1" ? "plr2" : "plr1"
}

export const getLine = (board) => {
    for (var i in winPatterns) {
        var winPattern = winPatterns[i]
        var piecesOnWinPattern = [board[winPattern[0]], board[winPattern[1]], board[winPattern[2]]]
            .filter((value, index, self) => {
                return self.indexOf(value) === index
            })

        if (piecesOnWinPattern.length > 1) {
            continue;
        }

        return winPattern
    }
    return []
}