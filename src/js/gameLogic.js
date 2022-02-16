export default class Player {
  constructor(hearts, points, turns) {
    this.hearts = hearts;
    this.points = points;
    this.turns = turns;
  }

  guessCheck(playerGuess, itemPrice) {
    const tenPoint = itemPrice;
    const eightPoint = itemPrice * 0.8;
    const sixPoint = itemPrice * 0.6;
    const fourPoint = itemPrice * 0.4;
    if (playerGuess > tenPoint) {
      this.hearts -= 1;
    } else if (playerGuess === tenPoint) {
      this.points += 10;
    } else if (playerGuess >= eightPoint) {
      this.points += 8;
    } else if (playerGuess >= sixPoint) {
      this.points += 6;
    } else if (playerGuess >= fourPoint) {
      this.points += 4;
    } else {
      this.points += 2;
    }
    this.turns += 1;
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