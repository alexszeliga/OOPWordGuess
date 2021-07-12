const Player = require('./Player');
const GameRound = require('./GameRound');
const input = require('readline-sync');

class App {
  constructor() {
    this.player;
    this.round;
    this.roundsToPlay = 3;
    this.roundsPlayed = 0;
    this.words = ["potato", "tree", "pillow"]
  }
  setOptions() {
    console.log(`Rounds to play: ${this.roundsToPlay}, Max number of rounds: ${this.words.length}`)
    this.roundsToPlay = input.question("How many rounds would you like to play? ",{defaultInput:this.roundsToPlay});
  }
  menu = () => {
    console.clear();
    console.log(
      `Welcome to the game, ${this.player.name}
      1. Set options
      2. Play game
      `);
    let selection = this.player.getInput(/^[1-2]{1}$/, "Select a menu item: ");
    switch (selection) {
      case "1":
        console.clear();
        this.player.setOptions();
        this.setOptions();
        this.menu()
        break;
      case "2":
        console.clear();
        console.log(`Now starting a game with ${this.roundsToPlay} rounds; with ${this.player.letterGuesses} misses allowed`)
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
    while (this.words.length > 0 && this.roundsToPlay > 0) {
      this.round = new GameRound(this.getRandomWord(), this.player);
      let outcome = this.round.play();
      this.roundsToPlay--;
      console.log(outcome)
    }
  };

  getRandomWord() {
    let word = this.words.splice(Math.floor(Math.random() * this.words.length), 1);
    return word;
  }
}


module.exports = App;