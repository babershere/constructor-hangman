// Instructions
// The completed game should meet the following criteria:
// The completed game should be able to receive user input using the inquirer or prompt npm packages.
// Feel free to use as many different types of constructor functions as you are able to, but at a minimum, you must create the following constructor functions:
// Word: Used to create an object representing the current word the user is attempting to guess.This should contain word specific logic and data.
// Letter: Used for each letter in the current word.Each letter object should either display an underlying character, or a blank placeholder(such as an underscore), depending on whether or not the user has guessed the letter.This should contain letter specific logic and data.
// You must keep track of the user's remaining guesses and prompt the user if they would like to end the game if none remain.
// Each constructor function should be in it's own file and be exported and required wherever needed.
// Look into function prototypes and use them for a few of your constructor's methods.


// Notes
// Since this assignment is a command - line application, you don't need to deploy it anywhere. You will, however, be required to upload it to Github.
// Remember to include a package.json file containing your project dependencies in your Github repo!

// Minimum Requirements
// Attempt to complete homework assignment as described in instructions.If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed.


var prompt = require('prompt');
var Word = require("./word.js");

console.log("Let's play the MV Agusta hang man game!")
console.log("Guess the MV's bike models")
console.log("-----------------")

prompt.start();

var guessedLetters = [];


game = {
    wordBank: ['brutale', 'dragster', 'turismo'],

    wordsWon: 0,
    guessesRemaining: 10,
    currentWrd: null,

    startGame: function (wrd) {
        this.resetGuesses();
        this.currentWrd = new Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);
        this.currentWrd.getLet();
        this.promptUser();
    },

    resetGuesses: function() {
        this.guessesRemaining = 10;
    },
    hideLetters: function (currentWrd) {
        var displayThis = [];

        // console.log(guessesRemaining);
        // TODO: create a for loop that will go letter by letter in 'currentWrd' and compare that with guessedLetters array and if found
        //       don't do anything, if not found then replace that letter with _ 
        // 'josh'  g     '____' o '_o__' h '_o_h' 
        for (var i = 0; i < currentWrd.length; i++)
        {   
            displayThis[i] = '_';
            for (var j = 0; j < guessedLetters.length; j++)
            {
                if (currentWrd[i] === guessedLetters[j] ){
                    displayThis[i] = currentWrd[i];
                }
            }
        }
        console.log(displayThis.toString());
},

promptUser: function() {
    var self = this;
    prompt.get(['guessLet'], function (err, result) {
        console.log("You guessed: " + result.guessLet);
        guessedLetters.push(result.guessLet);
        var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

        if (manyGuessed == 0) {
            console.log("WRONG");
            self.hideLetters(self.currentWrd.target);
            self.guessesRemaining--;

        } else {
            console.log("CORRECT");
            self.hideLetters(self.currentWrd.target);
            if (self.currentWrd.findWord()) {
                console.log("You won!");
                console.log("-------------------");
                return;
            }
        }

        console.log("Guesses remaining: " + self.guessesRemaining);
        console.log("-------------------");
        if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)) {
            self.promptUser();
        }
        else if (self.guessesRemaining == 0) {

            console.log("Game over. Correct Word ", self.currentWrd.target);
        } else {
            console.log(self.currentWrd.wordRender());
        }
    });

},


};

game.startGame();
