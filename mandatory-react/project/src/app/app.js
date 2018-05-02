import React from 'react';

import {makeMove, newGame} from '../logic';

import Message from './message';
import Tile from './tile';

/*
The main game App! It should have a TicTacToe game state in its component state,
and use the Tile and Message components to render the game.

Then the `makeMove` function from the logic layer should be used to update the
game state as the tiles are being clicked.

The user should also be able to reset the game.

The App component should render an outer element with a `container` CSS class,
and all tiles in an element with a `board` CSS class.
*/

export default class App extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        game: newGame()
      }
      this.update = this.update.bind(this)
      this.reset = this.reset.bind(this)
  }

  update(pos){
      this.setState({
          game: makeMove(this.state.game, pos)
      })
  }

  reset() {
      this.setState({game: newGame()})
  }

  render(){
    return (
        <div>
            <div className="state">
                <Message state={this.state.game.state} />
            </div>
            <div className="board">
                {this.state.game.board.map((piece, i) =>
                    <Tile key={i} piece={piece} line={this.state.game.line.indexOf(i) > -1} callback={() => this.update(i)} />
                )}
            </div>
            <div className="reset">
                <button onClick={this.reset}>Reset game</button>
            </div>
        </div>
    );
  }
}
