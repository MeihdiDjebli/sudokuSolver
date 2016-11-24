import SudokuSolver from '../source/Solver';
import Grid from '../source/Grid';

let sudokuGridHTML = document.getElementById('sudokuGrid');

var values = [];

var squaresHTML = sudokuGridHTML.getElementsByClassName('square');



var sudokuGrid = new Grid(values);

var sudokuGridSolved = SudokuSolver.solveGrid(sudokuGrid);
