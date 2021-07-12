const input = require('readline-sync');

class Player {
  constructor() {
    this.name = "Player";
    this.currentGuess;
    this.letterGuesses = 5;
    this.guesses = [];
  }
  setOptions(cb){
    console.clear();
    this.name = input.question(`Enter a new name, or leave this field blank to stick with the current name ["${this.name}"]: `,{defaultInput:this.name});
    this.letterGuesses = input.question(`Enter the number of guesses before game-over [Current setting: ${this.letterGuesses}]: `, {
      defaultInput: this.letterGuesses
    })
    if (typeof cb === 'function') {
      cb();
    }
  }
  addGuess = (letter) => {
    if (!this.guesses.includes(letter)) {
      this.currentGuess = letter;
      this.guesses.push(this.currentGuess);
    } else {
      this.currentGuess = false;
    }

  }
  getInput(limit=/.*/, query="Please Provide Input: ", limitMessage="Invalid input", cb) {
    let playerInput = input.question(
      query,
      {
        limit:limit,
        limitMessage:limitMessage,
      }
    ).toLowerCase();
    if (typeof cb === 'function') {
      cb(playerInput);
    }
    return playerInput;
  }
  setName(newName) {
    if (typeof newName === "string" && this.newName !== newName) {
      this.name = newName;
    }
  }
}

module.exports = Player;