// Function to create the 9x9 Sudoku grid
function createSudokuGrid() {
    let tableBody = document.getElementById('sudoku-grid');
    for (let i = 0; i < 9; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            let cell = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.classList.add('sudoku-cell');
            cell.appendChild(input);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

// Call the function to create the grid when the page loads
window.onload = createSudokuGrid;

// Get the Sudoku input from the grid
function getInputSudoku() {
    let sudoku = [];
    let inputs = document.querySelectorAll('.sudoku-cell');
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let value = inputs[i * 9 + j].value;
            row.push(value === '' ? 0 : parseInt(value));
        }
        sudoku.push(row);
    }
    return sudoku;
}

// Populate the grid with the solved Sudoku
function displaySudoku(sudoku) {
    let inputs = document.querySelectorAll('.sudoku-cell');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputs[i * 9 + j].value = sudoku[i][j];
        }
    }
}

function isSafe(row, col, box, x, y, val) {
    let boxIndex = `${Math.floor(x / 3)}${Math.floor(y / 3)}`;
    return !row[x][val] && !col[y][val] && !box[boxIndex][val];
}

function helper_function(row,col,visited,sudoku,num){
    if(num===81) return true;
    let a=Math.floor(num / 9);
    let b=num%9;
    if(sudoku[a][b] !== 0){
         return helper_function(row,col,visited,sudoku,num+1);
    }
    for(let i=1; i<=9; i++){
        if(isSafe(row,col,visited,a,b,i)){
            row[a][i]=true;
            col[b][i]=true;
            let key = `${Math.floor(a / 3)}${Math.floor(b / 3)}`;
            visited[key][i]=true;
            sudoku[a][b]=i;
            let flag=helper_function(row,col,visited,sudoku,num+1);
            if(flag) return true;
            else{
                row[a][i]=false;
                col[b][i]=false;
                visited[key][i]=false;
                sudoku[a][b]=0;
            }
        }
    }
    return false;
}
function sudoku_solver(){
    let sudoku=getInputSudoku();
    let row = Array.from({ length: 9 }, () => Array(10).fill(false));
    let col = Array.from({ length: 9 }, () => Array(10).fill(false));
    let visited = {};

    // Initialize box with keys for each 3x3 sub-grid
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            visited[`${i}${j}`] = Array(10).fill(false);
        }
    }
    let flag=true;
    for(let i =0; i<9; i++){
        for(let j=0; j<9; j++){
            
            let val=sudoku[i][j];
            if(val===0) continue;
            let key = `${Math.floor(i / 3)}${Math.floor(j / 3)}`;
            if(row[i][val] || col[j][val] || visited[key][val]){
               
                flag=false;
            }
            else{
            row[i][val]=true;
            col[j][val]=true;
            visited[key][val]=true;
            }
        }
    }
    if (flag && helper_function( row, col, visited,sudoku, 0)) {
        displaySudoku(sudoku);
    } else {
        alert("No solution exists");
    }
}
//console.log("hi");