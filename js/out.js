/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function Coin(x, y) { // Object Coin which is returning random place on our field to create new coin 
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};
module.exports = Coin;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

function Furry() { // Object Fury which keeps our coordinates and actual direction of Fury's movement
    this.x = 0;
    this.y = 0;
    this.direction = "right";
};
module.exports = Furry;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(1);
var Coin = __webpack_require__(0);

function startNewGame() { // Start New Game function
    var newGameBtn = document.querySelector(".newGame");
    newGameBtn.addEventListener("click", function () { // Game begins after click on the "Start" button
        newGameBtn.parentElement.classList.add("invisible"); // Hide div fixed to the screen
        countdown();
    });

};

function countdown() {
    var arr = [
        [23, 24, 25, 35, 44, 45, 55, 63, 64, 65, 67], // array containing digits
        [23, 24, 25, 35, 43, 44, 45, 53, 63, 64, 65, 67],
        [25, 34, 35, 45, 55, 65, 67],
        [20, 21, 22, 24, 25, 26, 28, 30, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 60, 61, 62, 64, 65, 66, 68],
        []
    ];
    var counter = 0;
    var board = document.querySelectorAll("section#board div");

    var count = setInterval(function () {
        for (var i = 0; i < 5; i++) {
            for (var i = 0; i < 100; i++) {
                board[i].style.backgroundColor = "white"; // clears all the board
            };
        };
        for (var i = 0; i < arr[counter].length; i++) {
            var field = arr[counter][i];
            board[field].style.backgroundColor = "black"; // print digits on the field
        };
        counter++; // increase counter
        if (counter >= 5) {
            clearInterval(count); // stop the interval
            play(); // run play function
        };
    }, 1000);
};

function play() {
    var newGame = new Game(); // create new Game object
    newGame.showFurry(); // initiate fury on the field
    newGame.showCoin(); // initiate first coin on the field
    newGame.startGame(); // initiate the interval (make the fury to move)
    document.addEventListener("keydown", function () { // capture arrow keys pressed
        newGame.turnFurry(event); // return pressed key number to function turnFury in our game.
    });
}

function Game() { // Our main game body
    this.board = document.querySelectorAll("section#board div"); // Keeps all fields on our board
    this.furry = new Furry(); // creates new Fury object in memory
    this.coin = new Coin(); // creates new coin in memory
    this.score = 0; // initial score value
    var self = this;
    this.index = function (x, y) { // calculates div number to be filled with object from XY coordinate
        return x + (y * 10);
    };
    this.showFurry = function () {
        if (this.furry.x >= 0 && this.furry.x < 10 && this.furry.y >= 0 && this.furry.y < 10) {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
        } // shows fury on the field
    };
    this.hideVisibleFury = function () { // hides fury when game is over
        if (this.furry.x >= 0 && this.furry.x < 10 && this.furry.y >= 0 && this.furry.y < 10) {
            this.board[this.index(this.furry.x, this.furry.y)].classList.remove("furry");
        }
    };
    this.showCoin = function () { // shows created coin on the field
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    };
    this.moveFurry = function () { // function runned inside interval
        this.gameOver(); // check if game is over, or not
        this.hideVisibleFury(); // remove old fury from the board when it moves
        if (this.furry.direction == "right") { // where fury should go depending on direction
            this.furry.x += 1;
        } else if (this.furry.direction == "left") {
            this.furry.x -= 1;
        } else if (this.furry.direction == "up") {
            this.furry.y -= 1;
        } else if (this.furry.direction == "down") {
            this.furry.y += 1;
        };
        this.showFurry() // showes fury in new place
    };
    this.turnFurry = function (event) { // changes the direction in Fury object depending on what result returns from eventListener
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        };
    };
    this.checkCoinCollision = function () { // function responsible for counting points if Furry gets coin
        var points = document.querySelector(".score");
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin"); // remove captured coin from the field
            this.coin = new Coin(); // create new one
            this.showCoin(); // show it on the field
            this.score += 1; // add a score
            points.innerHTML = this.score; // refres the score in HTML
        };
    };
    this.gameOver = function () { // function responsible for ending the game - it's running inside the interval
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) { // check if fury hits the wall
            clearInterval(self.IdSetInterval); // if yes, than stop the interval
            var overScreen = document.querySelector("#over");
            document.querySelector(".newGame div").innerText = "PLAY AGAIN!"; // change some data in DOM
            overScreen.classList.remove("invisible"); // show the game over screen
            overScreen.querySelector("h1").innerText = "GAME OVER";
            overScreen.querySelector("p").innerHTML = "Your score: <strong class=\"score\">" + this.score + "</strong>"; // insert additional data to overScreen
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin"); // remove coin from the field
            this.hideVisibleFury(); // remove fury from the field
        };
    };
    this.startGame = function () { // function responsible for seting the interval and proer functions inside of it
        this.IdSetInterval = setInterval(function () {
            self.moveFurry();
            self.checkCoinCollision();
        }, 250);
    };
};
startNewGame(); // run new game function

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(1);
var Coin = __webpack_require__(0);
var Game = __webpack_require__(2);


/***/ })
/******/ ]);