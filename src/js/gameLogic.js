export default class Player {
  constructor(hearts, points) {
    this.hearts = hearts;
    this.points = points;
  }

  guessCheck(playerGuess, itemPrice) {
    const tenPoint = itemPrice;
    const eightPoint = itemPrice * 0.8;
    const sixPoint = itemPrice * 0.6;
    const fourPoint = itemPrice * 0.4;
    
    if (playerGuess < tenPoint) {
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

  }

}