export default class Player {
  constructor(hearts, points, turns) {
    this.hearts = hearts;
    this.points = points;
    this.turns = turns;
  }

  guessCheck(playerGuess, itemPrice) {
    let operator = itemPrice/10;
    let points = parseInt(playerGuess/operator);
    if (playerGuess >= itemPrice) {
      return 0;
    } else if (points > 0) {
      return points;
    } else {
      return 1;
    }
  }

  endLogic() {
    if (this.hearts === 0) {
      return false;
    }
    if (this.turns === 5) {
      return true;
    } 
  }
}