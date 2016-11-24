var diff = require('arr-diff');
var arrayIntersection = require('array-intersection');
import Grid from '../source/Grid';
import {COLS, ROWS, SQUARES, VALUES} from '../source/Grid';

export default class Solver {

    static createGrid(values) {
        return new Grid(values);
    }

    static findCandidatesInZone(zone) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        let values = [];
        for (let box of zone) {
            values.push(box.value);
        }

        return diff(numbers, values).sort();
    }

    static scoreZone(zone) {
        let score = 0;

        for (let box of zone) {
            if (box.value) score++;
        }

        return score;
    }

    static findCandidates(grid, box) {
        if (box.value > 0) return [];

        let rowBoxZone = grid.findBoxesByRowRef(box.rowRef);
        let colBoxZone = grid.findBoxesByColRef(box.colRef);
        let squareBoxZone = grid.findBoxesBySquareRef(box.squareRef);

        return arrayIntersection(
            Solver.findCandidatesInZone(rowBoxZone),
            Solver.findCandidatesInZone(colBoxZone),
            Solver.findCandidatesInZone(squareBoxZone)
        );
    }

    /**
     * Return array of scores.
     *  64 is the better score : 1 candidate for the box
     *  0 is the worst score : box row and column are empty
     *  -1 is the n/a score : value exist
     * @param grid
     * @returns {Array}
     */
    static scoreGrid(grid) {
        let scoreCols = [];

        for (let colRef of COLS) {
            scoreCols.push(Solver.scoreZone(grid.findBoxesByColRef(colRef)));
        }

        let scoreRows = [];
        for (let rowRef of ROWS) {
            scoreRows.push(Solver.scoreZone(grid.findBoxesByRowRef(rowRef)));
        }

        let scoreSquares = [];
        for (let squareRef of SQUARES) {
            scoreSquares.push(Solver.scoreZone(grid.findBoxesBySquareRef(squareRef)));
        }

        let scoreGrid = [];
        let iBox = 0;
        for (let scoreRow of scoreRows) {
            for (let scoreCol of scoreCols) {
                let score;
                if (grid.boxes[iBox].value > 0) {
                    score = -1;
                }
                else {
                    let scoreMax = Math.max(scoreRow, scoreCol, scoreSquares[grid.boxes[iBox].squareRef-1])
                    if (scoreMax == 8)
                        score = 8;
                    else {
                        score = Math.round((scoreRow + scoreCol + scoreSquares[grid.boxes[iBox].squareRef-1]) / 3);
                    }
                }

                scoreGrid.push(score);
                iBox++;
            }
        }

        return scoreGrid;
    }

    /**
     * Return boxes's grid ordered by score desc
     *
     * @param grid
     * @returns {Array}
     */
    static findAllBoxesGridOrderedByScoreDesc(grid) {
        let scoreGrid = Solver.scoreGrid(grid);
        let boxesIndexed = [];

        // Determine min score
        let minScore = 8;
        for (let score of scoreGrid) {
            if (score < minScore)
                minScore = score;
        }

        let currentMaxScore = 9; // Score max is 8 so 9 is perforce greater
        while (currentMaxScore != minScore) {
            let currentScore = -2;
            // Determine new Max score (lower than precedent max score)
            for (let score of scoreGrid) {
                if (score < currentMaxScore && score > currentScore)
                    currentScore = score;
            }
            currentMaxScore = currentScore;

            // Add all boxes witch have this score
            for (let i=0;i<scoreGrid.length;i++) {
                if (scoreGrid[i] == currentMaxScore)
                    boxesIndexed.push(grid.boxes[i]);
            }
        }

        return boxesIndexed;
    }

    static solveBox(grid, box) {
        let candidates = Solver.findCandidates(grid, box);

        if (candidates.length == 1) return candidates[0];

        box.candidates = candidates;

        // Exclusion
        let boxSquareBoxes = grid.findBoxesBySquareRef(box.squareRef);

        for (let candidate of box.candidates) {
            let goodCandidate = true;
            for (let friendBox of boxSquareBoxes) {
                if (friendBox.ref != box.ref && friendBox.value == 0) {
                    friendBox.candidates = Solver.findCandidates(grid, friendBox);
                    if (friendBox.candidates.indexOf(candidate) > -1) {
                        goodCandidate = false;
                        break;
                    }
                }
            }
            if (goodCandidate) return candidate;
        }

        // Exclusive pair in row
        let boxRowBoxes = grid.findBoxesByRowRef(box.rowRef);
        let pairCandidates = [];
        for (let friendBox of boxRowBoxes) {
            if (friendBox.value == 0 && friendBox.ref != box.ref) {
                friendBox.candidates = Solver.findCandidates(grid, friendBox);
                let key = friendBox.candidates.sort().join();
                if (key in pairCandidates) {
                    pairCandidates[key]++;

                    if (pairCandidates[key] == friendBox.candidates.length) {
                        let candidatesDiff = diff(box.candidates, friendBox.candidates);
                        if (candidatesDiff.length == 1) return candidatesDiff[0];
                        box.candidates = candidatesDiff;
                    }
                }
                else
                    pairCandidates[key] = 1;
            }
        }

        // Exclusive pair in col
        let boxColBoxes = grid.findBoxesByColRef(box.colRef);
        pairCandidates = [];
        for (let friendBox of boxColBoxes) {
            if (friendBox.value == 0 && friendBox.ref != box.ref) {
                friendBox.candidates = Solver.findCandidates(grid, friendBox);
                let key = friendBox.candidates.sort().join();
                if (key in pairCandidates) {
                    pairCandidates[key]++;

                    if (pairCandidates[key] == friendBox.candidates.length) {
                        let candidatesDiff = diff(box.candidates, friendBox.candidates);
                        if (candidatesDiff.length == 1) return candidatesDiff[0];
                        box.candidates = candidatesDiff;
                    }
                }
                else
                    pairCandidates[key] = 1;
            }
        }

        // Exclusive pair in square
        pairCandidates = [];
        for (let friendBox of boxSquareBoxes) {
            if (friendBox.value == 0 && friendBox.ref != box.ref) {
                friendBox.candidates = Solver.findCandidates(grid, friendBox);
                let key = friendBox.candidates.sort().join();
                if (key in pairCandidates) {
                    pairCandidates[key]++;

                    if (pairCandidates[key] == friendBox.candidates.length) {
                        let candidatesDiff = diff(box.candidates, friendBox.candidates);
                        if (candidatesDiff.length == 1) return candidatesDiff[0];
                        box.candidates = candidatesDiff;
                    }
                }
                else
                    pairCandidates[key] = 1;
            }
        }

        return 0;
    }

    static solveGrid(grid) {
        let listOfBoxesOrderedByScoreDesc = Solver.findAllBoxesGridOrderedByScoreDesc(grid);

        for (let box of listOfBoxesOrderedByScoreDesc) {
            if (box.value == 0) {
                let value = Solver.solveBox(grid, box);
                if (value > 0) {
                    box.value = value;
                    return Solver.solveGrid(grid);
                }
            }
        }

        return grid;
    }


}