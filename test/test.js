import Box from '../source/Box';
import Grid from '../source/Grid';
import Solver from '../source/Solver';
let expect = require('expect.js');

var sudokuFixtures =
       [5, 3, 0, 0, 7, 0, 0, 0, 0,
        6, 0, 0, 1, 9, 5, 0, 0, 0,
        0, 9, 8, 0, 0, 0, 0, 6, 0,
        8, 0, 0, 0, 6, 0, 0, 0, 3,
        4, 0, 0, 8, 0, 3, 0, 0, 1,
        7, 0, 0, 0, 2, 0, 0, 0, 6,
        0, 6, 0, 0, 0, 0, 2, 8, 0,
        0, 0, 0, 4, 1, 9, 0, 0, 5,
        0, 0, 0, 0, 8, 0, 0, 7, 9];

describe('Box', function() {
    describe('constructor', function() {
        it('should return Box instance with reference', function () {
            let box = new Box("A1");
            expect(box.ref).to.equal("A1");
        });
        it('should return Box instance with 0 value when no value given', function () {
            let box = new Box("A1");
            expect(box.value).to.equal(0);
        });
        it('should return Box instance with the given value', function () {
            let box = new Box("A1", 5);
            expect(box.value).to.equal(5);
        });
    });
    describe('colRef', function () {
        it('should return the good column reference', function () {
            let box = new Box("B4");
            expect(box.colRef).to.equal('B');
        });
    });
    describe('rowRef', function() {
        it('should return the good row reference', function () {
            let box = new Box("C7");
            expect(box.rowRef).to.equal('7');
        });
    });
});

describe('Grid', function() {
    describe('constructor', function () {
        it('should return Grid instance with good numbers of boxes', function () {
            let grid = new Grid(sudokuFixtures);
            expect(grid.boxes.length).to.equal(81);
        });
    });
    describe('findOneBoxByRef', function () {
        it('should return the good box instance', function () {
            let box = new Box("E4", 6);
            let grid = new Grid(sudokuFixtures);
            expect(grid.findOneBoxByRef("E4").ref).to.equal(box.ref);
            expect(grid.findOneBoxByRef("E4").value).to.equal(box.value);
        });
    });
    describe('findBoxesByColRef', function () {
        it('should return all column boxes', function () {
            let grid = new Grid(sudokuFixtures);
            let columnA = grid.findBoxesByColRef('A');

            expect(columnA.length).to.equal(9);
            expect(columnA[0].value).to.equal(5);
            expect(columnA[0].ref).to.equal('A1');
            expect(columnA[1].value).to.equal(6);
            expect(columnA[1].ref).to.equal('A2');
            expect(columnA[2].value).to.equal(0);
            expect(columnA[2].ref).to.equal('A3');
            expect(columnA[3].value).to.equal(8);
            expect(columnA[3].ref).to.equal('A4');
            expect(columnA[4].value).to.equal(4);
            expect(columnA[4].ref).to.equal('A5');
            expect(columnA[5].value).to.equal(7);
            expect(columnA[5].ref).to.equal('A6');
            expect(columnA[6].value).to.equal(0);
            expect(columnA[6].ref).to.equal('A7');
            expect(columnA[7].value).to.equal(0);
            expect(columnA[7].ref).to.equal('A8');
            expect(columnA[8].value).to.equal(0);
            expect(columnA[8].ref).to.equal('A9');
        });
    });
    describe('findBoxesByRowRef', function () {
        it('should return all row boxes', function () {
            let grid = new Grid(sudokuFixtures);
            let row1 = grid.findBoxesByRowRef(1);

            expect(row1.length).to.equal(9);
            expect(row1[0].value).to.equal(5);
            expect(row1[0].ref).to.equal('A1');
            expect(row1[1].value).to.equal(3);
            expect(row1[1].ref).to.equal('B1');
            expect(row1[2].value).to.equal(0);
            expect(row1[2].ref).to.equal('C1');
            expect(row1[3].value).to.equal(0);
            expect(row1[3].ref).to.equal('D1');
            expect(row1[4].value).to.equal(7);
            expect(row1[4].ref).to.equal('E1');
            expect(row1[5].value).to.equal(0);
            expect(row1[5].ref).to.equal('F1');
            expect(row1[6].value).to.equal(0);
            expect(row1[6].ref).to.equal('G1');
            expect(row1[7].value).to.equal(0);
            expect(row1[7].ref).to.equal('H1');
            expect(row1[8].value).to.equal(0);
            expect(row1[8].ref).to.equal('I1');
        });
    });
    describe('findBoxesBySquareRef', function () {
        it('should return all square boxes', function () {
            let grid = new Grid(sudokuFixtures);

            // Square 1
            let squareBoxes = grid.findBoxesBySquareRef(1);

            expect(squareBoxes.length).to.equal(9);
            expect(squareBoxes[0].ref).to.equal('A1');
            expect(squareBoxes[1].ref).to.equal('B1');
            expect(squareBoxes[2].ref).to.equal('C1');
            expect(squareBoxes[3].ref).to.equal('A2');
            expect(squareBoxes[4].ref).to.equal('B2');
            expect(squareBoxes[5].ref).to.equal('C2');
            expect(squareBoxes[6].ref).to.equal('A3');
            expect(squareBoxes[7].ref).to.equal('B3');
            expect(squareBoxes[8].ref).to.equal('C3');

            // Square 2
            squareBoxes = grid.findBoxesBySquareRef(2);

            expect(squareBoxes.length).to.equal(9);
            expect(squareBoxes[0].ref).to.equal('D1');
            expect(squareBoxes[1].ref).to.equal('E1');
            expect(squareBoxes[2].ref).to.equal('F1');
            expect(squareBoxes[3].ref).to.equal('D2');
            expect(squareBoxes[4].ref).to.equal('E2');
            expect(squareBoxes[5].ref).to.equal('F2');
            expect(squareBoxes[6].ref).to.equal('D3');
            expect(squareBoxes[7].ref).to.equal('E3');
            expect(squareBoxes[8].ref).to.equal('F3');

            // Square 3
            squareBoxes = grid.findBoxesBySquareRef(3);

            expect(squareBoxes.length).to.equal(9);
            expect(squareBoxes[0].ref).to.equal('G1');
            expect(squareBoxes[1].ref).to.equal('H1');
            expect(squareBoxes[2].ref).to.equal('I1');
            expect(squareBoxes[3].ref).to.equal('G2');
            expect(squareBoxes[4].ref).to.equal('H2');
            expect(squareBoxes[5].ref).to.equal('I2');
            expect(squareBoxes[6].ref).to.equal('G3');
            expect(squareBoxes[7].ref).to.equal('H3');
            expect(squareBoxes[8].ref).to.equal('I3');

            // Square 4
            squareBoxes = grid.findBoxesBySquareRef(4);

            expect(squareBoxes.length).to.equal(9);
            expect(squareBoxes[0].ref).to.equal('A4');
            expect(squareBoxes[1].ref).to.equal('B4');
            expect(squareBoxes[2].ref).to.equal('C4');
            expect(squareBoxes[3].ref).to.equal('A5');
            expect(squareBoxes[4].ref).to.equal('B5');
            expect(squareBoxes[5].ref).to.equal('C5');
            expect(squareBoxes[6].ref).to.equal('A6');
            expect(squareBoxes[7].ref).to.equal('B6');
            expect(squareBoxes[8].ref).to.equal('C6');

            // Square 5
            squareBoxes = grid.findBoxesBySquareRef(5);

            expect(squareBoxes.length).to.equal(9);
            expect(squareBoxes[0].ref).to.equal('D4');
            expect(squareBoxes[1].ref).to.equal('E4');
            expect(squareBoxes[2].ref).to.equal('F4');
            expect(squareBoxes[3].ref).to.equal('D5');
            expect(squareBoxes[4].ref).to.equal('E5');
            expect(squareBoxes[5].ref).to.equal('F5');
            expect(squareBoxes[6].ref).to.equal('D6');
            expect(squareBoxes[7].ref).to.equal('E6');
            expect(squareBoxes[8].ref).to.equal('F6');
        });
    });
});

describe('Solver', function () {
    describe('findCandidatesInZone', function () {
        it('should return candidates in zone', function () {
            let grid = new Grid(sudokuFixtures);
            let candidates = Solver.findCandidatesInZone(grid.findBoxesBySquareRef(1));

            expect(candidates).to.eql([1, 2, 4, 7])
        });
    });
    describe('scoreGrid', function () {
        let grid = new Grid(sudokuFixtures);
        grid.showGridInConsole();
        let solvedGrid = Solver.solveGrid(grid);
        solvedGrid.showGridInConsole();
    });
});