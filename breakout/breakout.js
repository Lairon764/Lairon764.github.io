"use strict"
var main = document.getElementById("main");
var ball;
var paddle;
var intervalID;
var brokenCount = 0;
var ballX = (800 - 30) / 2;
var ballY = main.offsetTop + 300;
var paddlePosition;

var msPerFrame = 20;
var secondsPerframe = msPerFrame / 1000;

var vx = secondsPerframe *(Math.floor(Math.random() * 400) + 200);
if (Math.random() < 0.5) {
	vx = -vx;
}
var vy = secondsPerframe * 500;

function createGrid(){
	for (var col = 0; col < 10; col++){
		for (var row = 0; row <10; row++){
			var brick = document.createElement("div");	
			brick.classList.add("brick");
			brick.classList.add("row" + row);
			brick.classList.add("col" + col);
			main.appendChild(brick);
		}
	}
}

function breakBrick(row, col){
	var brick = document.getElementsByClassName("row" + row + " col" + col);
	if (brick[0] && !brick[0].classList.contains("broken")) {
		brick[0].classList.add("broken");
		brokenCount += 1;
		return true;
	} else {
		return false;
	}
}

function createPaddle(){
	paddle = document.createElement("div");
	paddle.id = "paddle";
	paddle.style.left = (800 - 140) / 2;
	main.appendChild(paddle);
}

function checkForPaddleCollision(x, y) {
	var paddleLeft = paddlePosition;
	var paddleRight = paddleLeft + 140;

	if (y > 550 && x > paddleLeft && x < paddleRight) {
		ballY = 520
		vy = -Math.abs(vy);
		return true;
	}
}

function checkForBrickCollision(x, y) {
	var collisionPoints = [[x, y - 15], [x, y + 15], [x + 15, y], [x - 15, y]]

	var brickHeight = 20;
	var brickWidth = 80;

	for (var index in collisionPoints){
		var row = Math.floor((collisionPoints[index][1] - 100) / brickHeight);
		var col = Math.floor(collisionPoints[index][0] / brickWidth);
	}
}

function checkForCollisions(x, y) {
	

	
	var row = Math.floor(y - 100) / brickHeight;
	var col = Math.floor(x / brickWidth);
	// var key = 'brick' + col + '-' + row;

	if (row < 10 && col < 10) {
		if (breakBrick(row, col)) {
			vy = -vy;
		}
		return true;
	}

	if (ballX < 0) {
		ballX = 0;
		vx = Math.abs(vx);
	} else if (ballX > 770) {
		ballX = 770;
		vx = -Math.abs(vx);
	} else if (ballY < 0) {
		ballY = 0;
		vy = Math.abs(vy);
	} else if (ballY > 565) {
		ballY = 570;
		vy = -Math.abs(vy);
	}

}

function moveBall(){
	if (brokenCount >= 100) {
		alert("You won!");
		window.clearInterval(intervalID);
		document.location.reload();
	}
	ballX += vx;
	ballY += vy;

	checkForCollisions(ballX, ballY);

	ball.style.left = ballX;
	ball.style.top = ballY;

}

function mouseHandler(event){
	var paddle = document.getElementById("paddle");
	var center = window.innerWidth / 2;
	var maxLeft = center - 330;
	var maxRight = center + 330;
	var x = event.clientX;
	if (x > maxLeft && x < maxRight) {
		var position = x - maxLeft;
		paddle.style.left = position
		paddlePosition = position
	}
}

function clickHandler(e){
	ball.classList.remove("broken");
	intervalID = setInterval(moveBall, 20);
	document.body.removeEventListener("click", clickHandler);
}

function createBall(){
	ball = document.createElement("div");
	ball.id = "ball";
	ball.classList.add("broken");
	ball.style.left = ballX;
	ball.style.top = ballY;
	main.appendChild(ball);
}


document.body.addEventListener("mousemove", mouseHandler);
document.body.addEventListener("click", clickHandler);

function newGame() {
	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}

	document.body.removeEventListener("mousemove", mouseHandler);
	document.body.removeEventListener("click", clickHandler);

	createGrid();
	createPaddle();
	createBall();

	document.body.addEventListener("mousemove", mouseHandler);
	document.body.addEventListener("click", clickHandler);

}

newGame();

