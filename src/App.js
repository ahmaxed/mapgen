import React, {Component} from 'react';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: 5,
      maxTunnels: 2,
      maxLength: 3,
      grid: []
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  fullArray(num, dimensions) {
    var array = [];
    for (var i = 0; i < dimensions; i++) {
      array.push([]);
      for (var j = 0; j < dimensions; j++) {
        array[i].push(num);
      }
    }
    return array;
  }

  onChange(e) {
    this.setState({
      [e.target.name]: Number(e.target.value)
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  nextMove() {
    let dimensions = this.state.dimensions,
      maxTunnels = this.state.maxTunnels, // the number of turns the tunnel has
      maxLength = this.state.maxLength, // maximum number of each turn can have
      fulArr = this.fullArray(1, dimensions), // save a full array;
      currentRow = Math.floor(Math.random() * dimensions), // pick a random row
      currentColumn = Math.floor(Math.random() * dimensions), // pick a random column
      directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], // turns allowed are horizontal right/left and vertical right/left //left,right,up,down
      lastTurn = [3, 3], // a variable to save the last turn it could have any non -1,0,1 value
      randTurn, // initiate variable for the turn
      randLength,
      tunneLength;
      //debugger;
    while (maxTunnels) { // while number of allowed turns are not 0 do the following

      do { // do the following and check to see if passes the condition
        randTurn = directions[Math.floor(Math.random() * directions.length)]; //randomly choose a turn
        //if the player is at the edge of the map and the random turn wants to push it off map select another turn
        //if the turn is similar to the previously selected turn or is reverse of the previous turn select another turn
      } while (((randTurn[0] === -1 * lastTurn[0]) && (randTurn[1] === -1 * lastTurn[1])) || ((randTurn[0] === lastTurn[0]) && (randTurn[1] === lastTurn[1])));

      randLength = Math.ceil(Math.random() * maxLength); //randomly choose a length form the maximum allowed length
      tunneLength = 0;

      while (tunneLength < randLength) { //loop over the length

        //break the loop if it is going out of the map
        if (((currentRow === 0) && (randTurn[0] === -1)) ||
            ((currentColumn === 0) && (randTurn[1] === -1)) ||
            ((currentRow === dimensions - 1) && (randTurn[0] === 1)) ||
            ((currentColumn === dimensions - 1) && (randTurn[1] === 1))) {
          break;
        } else {
          fulArr[currentRow][currentColumn] = 0; //set the value of the item to 0
          currentRow = currentRow + randTurn[0]; //otherwise incriment the row and col according to the turn
          currentColumn = currentColumn + randTurn[1];
          tunneLength++;
        }
      }

      if (tunneLength) {
        lastTurn = randTurn; //set last turn to the value of the current turn
        maxTunnels--; // decrement the number of turns allowed
      }
    }
    return fulArr; // finally return the array to be drawn
  };

  onClick(e) {
    console.log("clicked");
    this.forceUpdate()
  }

  render() {
    let grid = this.nextMove();
    return (
      <div className="container">
        <div className="form-group row">
          <div className="col-xs-push-3 col-sm-push-4 col-md-push-5 col-lg-push-5 col-xs-3 col-sm-2 col-md-1 col-lg-1">
            <label>dimensions</label>
            <input className="form-control" name="dimensions" type="text" maxLength="2" value={this.state.dimensions} onChange={this.onChange}/>
          </div>
          <div className="col-xs-push-3 col-sm-push-4 col-md-push-5 col-lg-push-5 col-xs-3 col-sm-2 col-md-1 col-lg-1">
            <label>maxTunnels</label>
            <input className="form-control" name="maxTunnels" type="text" maxLength="3" value={this.state.maxTunnels} onChange={this.onChange}/>
          </div>
          <div className="col-xs-push-3 col-sm-push-4 col-md-push-5 col-lg-push-5 col-xs-3 col-sm-2 col-md-1 col-lg-1">
            <label>maxLength</label>
            <input className="form-control" name="maxLength" type="text" maxLength="3" value={this.state.maxLength} onChange={this.onChange}/>
          </div>
        </div>
        <table className="grid" onClick={this.onClick}>
          <thead>
            {grid.map((obj, row) => <tr key={row}>{obj.map((obj2, col) =>< td className = {
                obj2 === 1
                  ? 'wall'
                  : 'tunnel'
              }
              key = {
                col
              } > </td>)}</tr>)}
          </thead>
        </table>
      </div>
    );
  }
}
export default App;
