'use strict';

var
	resetButton = document.getElementById('reset'),
	colors = [],
	squares = [],
	prevSquare = null;

/**
 * helper functions
 */

for (var i = 0; i < 10; i++) {
	colors.push('square-' + i);
}

function checkGame(gameSquare) {
	if (prevSquare === null) {
		prevSquare = gameSquare;
		return;
	}
	if(prevSquare.color === gameSquare.color) {
		prevSquare.lock();
		gameSquare.lock();
	} else {
		var a = prevSquare;
		var b = gameSquare;
		setTimeout(function () {
			a.reset();
			b.reset();
		}, 400);
	}
	prevSquare = null;
}

function random(n) {
	return Math.floor(Math.random() * n);
}

function getSomeColors() {
	var randomColors =  [];
	var colorscopy = colors.slice();
	for (var i = 0; i < 8; i++) {
		var index = random(colorscopy.length);
		var color = colorscopy.splice(index, 1)[0];
		randomColors.push(color);
	}
	return randomColors.concat(randomColors.slice());
}

function randomizeColors() {
	var randomColors = getSomeColors();
	squares.forEach(function (sqr) {
		var color = randomColors.splice(random(randomColors.length), 1)[0];
		sqr.setColor(color);
	});
}

function clearGame() {
	squares.forEach(function (sqr) {
		sqr.reset();
	});
	setTimeout(function () {
		randomizeColors();
	}, 400);
};

/**Helper functions end */

function GameSquare(el, color) {
	this.el = el;
	this.isLocked = false;
	this.isOpen = false;
	this.el.addEventListener('click', this, false);
	this.setColor(color);
}

GameSquare.prototype.reset = function () {
	this.isLocked = false;
	this.isOpened = false;
	this.el.classList.remove('flip');
}

GameSquare.prototype.lock = function () {
	this.isLocked = true;
	this.isOpened = true;
}

GameSquare.prototype.setColor = function (color) {
	this.el.children[0].children[1].classList.remove(this.color);
	this.color = color;
	this.el.children[0].children[1].classList.add(this.color);
}

GameSquare.prototype.handleEvent = function (e) {
	switch(e.type) {
		case 'click':
			if (this.isOpen || this.isLocked) {
				return;
			}
			console.log(';here');
			this.el.classList.add('flip');
			checkGame(this);
	}
}

function _initGame() {
	resetButton.addEventListener('click', clearGame);

	var elms = document.getElementsByClassName('game-square');
	var randomColors = getSomeColors();
	for (var i=0; i < elms.length; i++) {
		var index = random(randomColors.length);
		var color = randomColors.splice(index, 1)[0];
		squares.push(new GameSquare(elms[i], color));
	}
	console.log(squares);
}

_initGame();
