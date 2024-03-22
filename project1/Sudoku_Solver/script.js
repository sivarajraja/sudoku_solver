var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudoku_solver(board, 0, 0, 9);
};

function is_valid(board, row, col, num, size){     // to check if the num is valid 

    // check the row and column
    for(let i=0; i<size; i++){

        if(board[row][i] == num || board[i][col] == num){
            return false;
        }
    }

    // check the sub matrix
    let rn = Math.sqrt(size);
    let s_row = row - (row % rn);
    let s_col = col - (col % rn);

    for(let i=s_row; i<s_row+rn; i++){
        for(let j=s_col; j<s_col+rn; j++){

            if(board[i][j] == num){
                return false;
            }
        }
    }
    return true;
}

function sudoku_solver(board, row, col,size){

    // base case = if position reaches the end
    if(row == size){
        FillBoard(board)
        return true;
    }

    // increase the row if the column goes out of the board
    if(col == size){
        return sudoku_solver(board,row+1,0,size);
    }

    // if the place is already filled just skip
    if(board[row][col] != 0){
        return sudoku_solver(board,row,col+1,size);
    }

    for(let num=1; num<=9; num++){

        if(is_valid(board,row,col,num,size)){

            board[row][col] = num;
            let subAns = sudoku_solver(board,row,col+1,size);

            if(subAns){
                return true;
            }

            // this is the time to backtracking
            else{
                board[row][col] = 0;
            }
        }
        
    }
    return false;
}
