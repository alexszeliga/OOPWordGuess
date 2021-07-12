class GameRound {
  constructor(word, player) {
    this.word = String(word);
    this.player = player;
    this.guesses = [];
    this.guessesRemaining = player.letterGuesses;
    this.blankLetterCount = this.word.length;
  }
  wordContainsLetter(letter) {
    if (this.word.indexOf(letter) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  getWordWithGuesses() {
    const output = this.word.split("").map(
      (letter) => {
        if (this.player.guesses.includes(letter)) {
          return letter.toUpperCase();
        } else {
          return "_";
        }
      }
    );
    const newBlankLetterCount = output.filter((letter) => letter === "_").length;
    this.blankLetterCount = newBlankLetterCount;
    return output;
  }

  gameBoardOutput() {
    return this.getWordWithGuesses().join(" ");
  }

  scoreBoardOutput() {
    return `Blanks left: ${this.blankLetterCount} Guesses left: ${this.guessesRemaining}`
  }

  play() {
    console.log("cheater: ", this.word)
    while (this.guessesRemaining > 0 && this.blankLetterCount > 0) {
      const newGuess = this.player.getInput(/^[a-z,A-Z]{1}$/, "Please choose a letter: ", "Please enter one letter only.", this.player.addGuess);
      // tally
      if (this.player.currentGuess && !this.word.includes(newGuess)) {
        this.guessesRemaining -= 1;
      }
      // show output
      console.log(this.gameBoardOutput());
      console.log(this.scoreBoardOutput());
    }
    return this.guessesRemaining > 0;
  }
}

module.exports = GameRound;