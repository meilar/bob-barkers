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
    if (this.heart === 0) {
      return "lose";
    }
    if (this.turn === 5) {
      this.turn = 0;
      return true;
    } 
    return;
  }
}