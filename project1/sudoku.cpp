/*
    project name : sudoku solver
    method : backtracking
*/

#include<iostream>
#include<math.h>

using namespace std;

void print_board(int board[][9], int size){
    
    // to print the board
    cout<<endl;
    for(int i=0; i<size; i++){
        for(int j=0; j<size; j++){
            cout<<board[i][j]<<" ";
        }
        cout<<endl;
    }
    cout<<endl;
}

bool is_valid(int board[][9],int row,int col,int num, int size){     // to check if the num is valid 

    // check the row and column
    for(int i=0; i<size; i++){

        if(board[row][i] == num || board[i][col] == num){
            return false;
        }
    }

    // check the sub matrix
    int rn = sqrt(size);
    int s_row = row - (row % rn);
    int s_col = col - (col % rn);

    for(int i=s_row; i<s_row+rn; i++){
        for(int j=s_col; j<s_col+rn; j++){

            if(board[i][j] == num){
                return false;
            }
        }
    }
    return true;
}

bool sudoku_solver(int board[][9], int row, int col, int size){

    // base case = if position reaches the end
    if(row == size){
        print_board(board,size);
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

    for(int num=1; num<=9; num++){

        if(is_valid(board,row,col,num,size)){

            board[row][col] = num;
            bool subAns = sudoku_solver(board,row,col+1,size);

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

int main(){

    int size = 9;   // size of the board is 9X9

    int board[9][9] = {
        {0,0,7,1,0,0,0,6,0},
        {1,0,5,2,0,8,0,0,0},
        {6,0,0,0,0,7,1,2,0},
        {3,1,2,4,0,5,0,0,8},
        {0,0,6,0,9,0,2,0,0},
        {0,0,0,0,0,3,0,0,1},
        {0,0,1,0,0,4,9,8,6},
        {8,0,3,9,0,6,0,0,0},
        {0,6,0,0,8,2,7,0,3}
    };

    sudoku_solver(board,0,0,size);

    return 0;
}