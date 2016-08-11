var playerSymbol = "X"
var turns = 0;
var size = 3


function getCellWithCoordinates(x, y) {
	return document.getElementById("square" + x + y);
}

function areWinningCells(a, b, c) {
	if ((a.innerHTML != '&nbsp;') && (a.innerHTML === b.innerHTML) && (a.innerHTML === c.innerHTML)) {
		a.classList.add('winner');
		b.classList.add('winner');
		c.classList.add('winner');
		if (turns >=9) {
			alert('Its a Tie');
			document.location.reload();
		} else {
			alert("Winner is " + playerSymbol);
			document.location.reload();
		}
	
		return true;
	}
	return false;
}

function checkWinner() {
	for (var column = 0; column < size; column++) {
		var x = getCellWithCoordinates(column, 0);
		var y = getCellWithCoordinates(column, 1);
		var z = getCellWithCoordinates(column, 2);
		areWinningCells(x, y, z);
	}
	for (var row = 0; row < size; row++) {
		var x = getCellWithCoordinates(0, row);
		var y = getCellWithCoordinates(1, row);
		var z = getCellWithCoordinates(2, row);
		areWinningCells(x, y, z);
	}
	for (var i = 0; i < size; i++) {
		
	}
  
  alert("Winner is" + playerSymbol);
}

function clickHandler() {
	if (this.innerHTML === "X" || this.innerHTML === "O") {
		return;
	}
	this.innerHTML = playerSymbol;
	turns++
	checkWinner();
	if (playerSymbol === "X") {
		playerSymbol = "O";
	} else {
		playerSymbol = "X";
	}
	
}

for (var column = 0; column < 3; column++) {
	for(var row = 0; row < 3; row++) {
		var cell = getCellWithCoordinates(column, row);
		cell.onclick = clickHandler;
	}
}