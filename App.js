const input = require('readline-sync');

const Player = require('./Player');
const GameRound = require('./GameRound');



class App {
  constructor() {
    this.player;
    this.round;
    this.roundsPlayed = 0;
    this.words = ["potato", "tree", "pillow"]
  }
  menu = () => {

    console.log(
      `Welcome to the game, ${this.player.name}
      1. Set options
      2. Play game
      `);
    let selection = this.player.getInput(/^[1-2]{1}$/, "Select a menu item: ");
    switch (selection) {
      case "1":
        this.player.setOptions(this.menu);
        break;
      case "2":
        this.playGame();
        break;
      default:
        break;
    }
  }

  boot() {
    console.clear();
    this.player = new Player();
    // boot menu
    this.menu();
  }

  playGame() {
    while (this.words.length > 0) {
      this.round = new GameRound(this.getRandomWord(), this.player);
      let outcome = this.round.play();
      console.log(outcome)
    }
  };

  getRandomWord() {
    let word = this.words.splice(Math.floor(Math.random() * this.words.length), 1);
    return word;
  }
}


module.exports = App;