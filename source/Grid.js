import Box from '../source/Box';

export const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
export const ROWS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const SQUARES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default class Grid {

    /**
     * Constructor with values of boxes. Value 0 is considered as empty box.
     * @param values (Array)
     */
    constructor(values) {
        if (values.length != 81) {
            console.log("A Sudoku Grid must to have 81 boxes. " + values.length + " given.")
            return;
        }

        this.boxes = [];

        let currentCol = 0;
        let currentRow = 0;

        for (let val of values) {
            let box = new Box(COLS[currentCol] + ROWS[currentRow], val);

            this.boxes.push(box);
            currentCol = (currentCol + 1) % COLS.length;
            if (currentCol == 0) currentRow++;
        }
    }

    /**
     * Return all column boxes
     * @param colRef string
     * @returns {Array}
     */
    findBoxesByColRef(colRef) {
        let colBoxes = [];

        for (let rowRef of ROWS)
            colBoxes.push(this.findOneBoxByRef(colRef + rowRef));

        return colBoxes;
    }

    /**
     * Return all row boxes
     * @param rowRef
     * @returns {Array}
     */
    findBoxesByRowRef(rowRef) {
        let rowBoxes = [];

        for (let colRef of COLS)
            rowBoxes.push(this.findOneBoxByRef(colRef + rowRef));

        return rowBoxes;
    }

    /**
     *
     * @param squareRef
     * @returns {Array}
     */
    findBoxesBySquareRef(squareRef) {
        let squareBoxes = [];
        let squareRefMinusOneButNotZero = (squareRef - 1 == 0) ? 1 : squareRef - 1;
        let indexOfFirstBox = (squareRef - 1) * 3 + 18 * Math.floor(squareRefMinusOneButNotZero / 3);

        squareBoxes.push(this.boxes[indexOfFirstBox]);
        squareBoxes.push(this.boxes[indexOfFirstBox + 1]);
        squareBoxes.push(this.boxes[indexOfFirstBox + 2]);
        squareBoxes.push(this.boxes[indexOfFirstBox + 9]);
        squareBoxes.push(this.boxes[indexOfFirstBox + 10]);
        squareBoxes.push(this.boxes[indexOfFirstBox + 11]);
        squareBoxes.push(this.boxes[indexOfFirstBox + 18]);
        squareBoxes.push(this.boxes[indexOfFirstBox + 19]);
        squareBoxes.push(this.boxes[indexOfFirstBox + 20]);

        return squareBoxes;
    }

    /**
     * Return one box identified by reference
     * @param boxRef
     * @returns {null|Box}
     */
    findOneBoxByRef(boxRef) {
        let colRef = boxRef.substr(0, 1);
        let rowRef = boxRef.substr(1);

        let colIndex = COLS.indexOf(colRef);
        if (colIndex == -1) return null;

        let boxIndex = colIndex + ((parseInt(rowRef) - 1) * COLS.length);

        if (boxIndex > this.boxes.length || boxIndex < 0) return null;

        return this.boxes[boxIndex];
    }

    showGridInConsole() {
        let lineSeparatorOutput = "___________________________";
        for (let colRef of COLS) {
            console.log(lineSeparatorOutput);
            let lineOutput = "";
            for (let rowRef of ROWS) {
                let box = this.findOneBoxByRef(colRef + rowRef);
                let value = (box.value == 0) ? " " : box.value.toString();
                lineOutput += "|" + value + "|";
            }
            console.log(lineOutput);
        }
    }
}