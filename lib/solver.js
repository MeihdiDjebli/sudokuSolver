(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("solver", [], factory);
	else if(typeof exports === 'object')
		exports["solver"] = factory();
	else
		root["solver"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Grid = __webpack_require__(1);
	
	var _Grid2 = _interopRequireDefault(_Grid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var diff = __webpack_require__(3);
	var arrayIntersection = __webpack_require__(5);
	
	var Solver = function () {
	    function Solver() {
	        _classCallCheck(this, Solver);
	    }
	
	    _createClass(Solver, null, [{
	        key: 'createGrid',
	        value: function createGrid(values) {
	            return new _Grid2.default(values);
	        }
	    }, {
	        key: 'findCandidatesInZone',
	        value: function findCandidatesInZone(zone) {
	            var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	
	            var values = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = zone[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var box = _step.value;
	
	                    values.push(box.value);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return diff(numbers, values).sort();
	        }
	    }, {
	        key: 'scoreZone',
	        value: function scoreZone(zone) {
	            var score = 0;
	
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = zone[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var box = _step2.value;
	
	                    if (box.value) score++;
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	
	            return score;
	        }
	    }, {
	        key: 'findCandidates',
	        value: function findCandidates(grid, box) {
	            if (box.value > 0) return [];
	
	            var rowBoxZone = grid.findBoxesByRowRef(box.rowRef);
	            var colBoxZone = grid.findBoxesByColRef(box.colRef);
	            var squareBoxZone = grid.findBoxesBySquareRef(box.squareRef);
	
	            return arrayIntersection(Solver.findCandidatesInZone(rowBoxZone), Solver.findCandidatesInZone(colBoxZone), Solver.findCandidatesInZone(squareBoxZone));
	        }
	
	        /**
	         * Return array of scores.
	         *  64 is the better score : 1 candidate for the box
	         *  0 is the worst score : box row and column are empty
	         *  -1 is the n/a score : value exist
	         * @param grid
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'scoreGrid',
	        value: function scoreGrid(grid) {
	            var scoreCols = [];
	
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = _Grid.COLS[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var colRef = _step3.value;
	
	                    scoreCols.push(Solver.scoreZone(grid.findBoxesByColRef(colRef)));
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            var scoreRows = [];
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = _Grid.ROWS[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var rowRef = _step4.value;
	
	                    scoreRows.push(Solver.scoreZone(grid.findBoxesByRowRef(rowRef)));
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	
	            var scoreSquares = [];
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = _Grid.SQUARES[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var squareRef = _step5.value;
	
	                    scoreSquares.push(Solver.scoreZone(grid.findBoxesBySquareRef(squareRef)));
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            var scoreGrid = [];
	            var iBox = 0;
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = scoreRows[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var scoreRow = _step6.value;
	                    var _iteratorNormalCompletion7 = true;
	                    var _didIteratorError7 = false;
	                    var _iteratorError7 = undefined;
	
	                    try {
	                        for (var _iterator7 = scoreCols[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                            var scoreCol = _step7.value;
	
	                            var score = void 0;
	                            if (grid.boxes[iBox].value > 0) {
	                                score = -1;
	                            } else {
	                                var scoreMax = Math.max(scoreRow, scoreCol, scoreSquares[grid.boxes[iBox].squareRef - 1]);
	                                if (scoreMax == 8) score = 8;else {
	                                    score = Math.round((scoreRow + scoreCol + scoreSquares[grid.boxes[iBox].squareRef - 1]) / 3);
	                                }
	                            }
	
	                            scoreGrid.push(score);
	                            iBox++;
	                        }
	                    } catch (err) {
	                        _didIteratorError7 = true;
	                        _iteratorError7 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                                _iterator7.return();
	                            }
	                        } finally {
	                            if (_didIteratorError7) {
	                                throw _iteratorError7;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
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
	
	    }, {
	        key: 'findAllBoxesGridOrderedByScoreDesc',
	        value: function findAllBoxesGridOrderedByScoreDesc(grid) {
	            var scoreGrid = Solver.scoreGrid(grid);
	            var boxesIndexed = [];
	
	            // Determine min score
	            var minScore = 8;
	            var _iteratorNormalCompletion8 = true;
	            var _didIteratorError8 = false;
	            var _iteratorError8 = undefined;
	
	            try {
	                for (var _iterator8 = scoreGrid[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                    var _score = _step8.value;
	
	                    if (_score < minScore) minScore = _score;
	                }
	            } catch (err) {
	                _didIteratorError8 = true;
	                _iteratorError8 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                        _iterator8.return();
	                    }
	                } finally {
	                    if (_didIteratorError8) {
	                        throw _iteratorError8;
	                    }
	                }
	            }
	
	            var currentMaxScore = 9; // Score max is 8 so 9 is perforce greater
	            while (currentMaxScore != minScore) {
	                var currentScore = -2;
	                // Determine new Max score (lower than precedent max score)
	                var _iteratorNormalCompletion9 = true;
	                var _didIteratorError9 = false;
	                var _iteratorError9 = undefined;
	
	                try {
	                    for (var _iterator9 = scoreGrid[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                        var score = _step9.value;
	
	                        if (score < currentMaxScore && score > currentScore) currentScore = score;
	                    }
	                } catch (err) {
	                    _didIteratorError9 = true;
	                    _iteratorError9 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                            _iterator9.return();
	                        }
	                    } finally {
	                        if (_didIteratorError9) {
	                            throw _iteratorError9;
	                        }
	                    }
	                }
	
	                currentMaxScore = currentScore;
	
	                // Add all boxes witch have this score
	                for (var i = 0; i < scoreGrid.length; i++) {
	                    if (scoreGrid[i] == currentMaxScore) boxesIndexed.push(grid.boxes[i]);
	                }
	            }
	
	            return boxesIndexed;
	        }
	    }, {
	        key: 'solveBox',
	        value: function solveBox(grid, box) {
	            var candidates = Solver.findCandidates(grid, box);
	
	            if (candidates.length == 1) return candidates[0];
	
	            box.candidates = candidates;
	
	            // Exclusion
	            var boxSquareBoxes = grid.findBoxesBySquareRef(box.squareRef);
	
	            var _iteratorNormalCompletion10 = true;
	            var _didIteratorError10 = false;
	            var _iteratorError10 = undefined;
	
	            try {
	                for (var _iterator10 = box.candidates[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                    var candidate = _step10.value;
	
	                    var goodCandidate = true;
	                    var _iteratorNormalCompletion14 = true;
	                    var _didIteratorError14 = false;
	                    var _iteratorError14 = undefined;
	
	                    try {
	                        for (var _iterator14 = boxSquareBoxes[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	                            var friendBox = _step14.value;
	
	                            if (friendBox.ref != box.ref && friendBox.value == 0) {
	                                friendBox.candidates = Solver.findCandidates(grid, friendBox);
	                                if (friendBox.candidates.indexOf(candidate) > -1) {
	                                    goodCandidate = false;
	                                    break;
	                                }
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError14 = true;
	                        _iteratorError14 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
	                                _iterator14.return();
	                            }
	                        } finally {
	                            if (_didIteratorError14) {
	                                throw _iteratorError14;
	                            }
	                        }
	                    }
	
	                    if (goodCandidate) return candidate;
	                }
	
	                // Exclusive pair in row
	            } catch (err) {
	                _didIteratorError10 = true;
	                _iteratorError10 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                        _iterator10.return();
	                    }
	                } finally {
	                    if (_didIteratorError10) {
	                        throw _iteratorError10;
	                    }
	                }
	            }
	
	            var boxRowBoxes = grid.findBoxesByRowRef(box.rowRef);
	            var pairCandidates = [];
	            var _iteratorNormalCompletion11 = true;
	            var _didIteratorError11 = false;
	            var _iteratorError11 = undefined;
	
	            try {
	                for (var _iterator11 = boxRowBoxes[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                    var _friendBox = _step11.value;
	
	                    if (_friendBox.value == 0 && _friendBox.ref != box.ref) {
	                        _friendBox.candidates = Solver.findCandidates(grid, _friendBox);
	                        var key = _friendBox.candidates.sort().join();
	                        if (key in pairCandidates) {
	                            pairCandidates[key]++;
	
	                            if (pairCandidates[key] == _friendBox.candidates.length) {
	                                var candidatesDiff = diff(box.candidates, _friendBox.candidates);
	                                if (candidatesDiff.length == 1) return candidatesDiff[0];
	                                box.candidates = candidatesDiff;
	                            }
	                        } else pairCandidates[key] = 1;
	                    }
	                }
	
	                // Exclusive pair in col
	            } catch (err) {
	                _didIteratorError11 = true;
	                _iteratorError11 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                        _iterator11.return();
	                    }
	                } finally {
	                    if (_didIteratorError11) {
	                        throw _iteratorError11;
	                    }
	                }
	            }
	
	            var boxColBoxes = grid.findBoxesByColRef(box.colRef);
	            pairCandidates = [];
	            var _iteratorNormalCompletion12 = true;
	            var _didIteratorError12 = false;
	            var _iteratorError12 = undefined;
	
	            try {
	                for (var _iterator12 = boxColBoxes[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                    var _friendBox2 = _step12.value;
	
	                    if (_friendBox2.value == 0 && _friendBox2.ref != box.ref) {
	                        _friendBox2.candidates = Solver.findCandidates(grid, _friendBox2);
	                        var _key = _friendBox2.candidates.sort().join();
	                        if (_key in pairCandidates) {
	                            pairCandidates[_key]++;
	
	                            if (pairCandidates[_key] == _friendBox2.candidates.length) {
	                                var _candidatesDiff = diff(box.candidates, _friendBox2.candidates);
	                                if (_candidatesDiff.length == 1) return _candidatesDiff[0];
	                                box.candidates = _candidatesDiff;
	                            }
	                        } else pairCandidates[_key] = 1;
	                    }
	                }
	
	                // Exclusive pair in square
	            } catch (err) {
	                _didIteratorError12 = true;
	                _iteratorError12 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                        _iterator12.return();
	                    }
	                } finally {
	                    if (_didIteratorError12) {
	                        throw _iteratorError12;
	                    }
	                }
	            }
	
	            pairCandidates = [];
	            var _iteratorNormalCompletion13 = true;
	            var _didIteratorError13 = false;
	            var _iteratorError13 = undefined;
	
	            try {
	                for (var _iterator13 = boxSquareBoxes[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	                    var _friendBox3 = _step13.value;
	
	                    if (_friendBox3.value == 0 && _friendBox3.ref != box.ref) {
	                        _friendBox3.candidates = Solver.findCandidates(grid, _friendBox3);
	                        var _key2 = _friendBox3.candidates.sort().join();
	                        if (_key2 in pairCandidates) {
	                            pairCandidates[_key2]++;
	
	                            if (pairCandidates[_key2] == _friendBox3.candidates.length) {
	                                var _candidatesDiff2 = diff(box.candidates, _friendBox3.candidates);
	                                if (_candidatesDiff2.length == 1) return _candidatesDiff2[0];
	                                box.candidates = _candidatesDiff2;
	                            }
	                        } else pairCandidates[_key2] = 1;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError13 = true;
	                _iteratorError13 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                        _iterator13.return();
	                    }
	                } finally {
	                    if (_didIteratorError13) {
	                        throw _iteratorError13;
	                    }
	                }
	            }
	
	            return 0;
	        }
	    }, {
	        key: 'solveGrid',
	        value: function solveGrid(grid) {
	            var listOfBoxesOrderedByScoreDesc = Solver.findAllBoxesGridOrderedByScoreDesc(grid);
	
	            var _iteratorNormalCompletion15 = true;
	            var _didIteratorError15 = false;
	            var _iteratorError15 = undefined;
	
	            try {
	                for (var _iterator15 = listOfBoxesOrderedByScoreDesc[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	                    var box = _step15.value;
	
	                    if (box.value == 0) {
	                        var value = Solver.solveBox(grid, box);
	                        if (value > 0) {
	                            box.value = value;
	                            return Solver.solveGrid(grid);
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError15 = true;
	                _iteratorError15 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
	                        _iterator15.return();
	                    }
	                } finally {
	                    if (_didIteratorError15) {
	                        throw _iteratorError15;
	                    }
	                }
	            }
	
	            return grid;
	        }
	    }]);
	
	    return Solver;
	}();
	
	exports.default = Solver;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.VALUES = exports.SQUARES = exports.ROWS = exports.COLS = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Box = __webpack_require__(2);
	
	var _Box2 = _interopRequireDefault(_Box);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var COLS = exports.COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
	var ROWS = exports.ROWS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var SQUARES = exports.SQUARES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var VALUES = exports.VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	
	var Grid = function () {
	
	    /**
	     * Constructor with values of boxes. Value 0 is considered as empty box.
	     * @param values (Array)
	     */
	    function Grid(values) {
	        _classCallCheck(this, Grid);
	
	        if (values.length != 81) {
	            console.log("A Sudoku Grid must to have 81 boxes. " + values.length + " given.");
	            return;
	        }
	
	        this.boxes = [];
	
	        var currentCol = 0;
	        var currentRow = 0;
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var val = _step.value;
	
	                var box = new _Box2.default(COLS[currentCol] + ROWS[currentRow], val);
	
	                this.boxes.push(box);
	                currentCol = (currentCol + 1) % COLS.length;
	                if (currentCol == 0) currentRow++;
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    }
	
	    /**
	     * Return all column boxes
	     * @param colRef string
	     * @returns {Array}
	     */
	
	
	    _createClass(Grid, [{
	        key: 'findBoxesByColRef',
	        value: function findBoxesByColRef(colRef) {
	            var colBoxes = [];
	
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = ROWS[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var rowRef = _step2.value;
	
	                    colBoxes.push(this.findOneBoxByRef(colRef + rowRef));
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	
	            return colBoxes;
	        }
	
	        /**
	         * Return all row boxes
	         * @param rowRef
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'findBoxesByRowRef',
	        value: function findBoxesByRowRef(rowRef) {
	            var rowBoxes = [];
	
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = COLS[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var colRef = _step3.value;
	
	                    rowBoxes.push(this.findOneBoxByRef(colRef + rowRef));
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            return rowBoxes;
	        }
	
	        /**
	         *
	         * @param squareRef
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'findBoxesBySquareRef',
	        value: function findBoxesBySquareRef(squareRef) {
	            var squareBoxes = [];
	            var squareRefMinusOneButNotZero = squareRef - 1 == 0 ? 1 : squareRef - 1;
	            var indexOfFirstBox = (squareRef - 1) * 3 + 18 * Math.floor(squareRefMinusOneButNotZero / 3);
	
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
	
	    }, {
	        key: 'findOneBoxByRef',
	        value: function findOneBoxByRef(boxRef) {
	            var colRef = boxRef.substr(0, 1);
	            var rowRef = boxRef.substr(1);
	
	            var colIndex = COLS.indexOf(colRef);
	            if (colIndex == -1) return null;
	
	            var boxIndex = colIndex + (parseInt(rowRef) - 1) * COLS.length;
	
	            if (boxIndex > this.boxes.length || boxIndex < 0) return null;
	
	            return this.boxes[boxIndex];
	        }
	    }, {
	        key: 'showGridInConsole',
	        value: function showGridInConsole() {
	            var lineSeparatorOutput = "___________________________";
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = COLS[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var colRef = _step4.value;
	
	                    console.log(lineSeparatorOutput);
	                    var lineOutput = "";
	                    var _iteratorNormalCompletion5 = true;
	                    var _didIteratorError5 = false;
	                    var _iteratorError5 = undefined;
	
	                    try {
	                        for (var _iterator5 = ROWS[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                            var rowRef = _step5.value;
	
	                            var box = this.findOneBoxByRef(colRef + rowRef);
	                            var value = box.value == 0 ? " " : box.value.toString();
	                            lineOutput += "|" + value + "|";
	                        }
	                    } catch (err) {
	                        _didIteratorError5 = true;
	                        _iteratorError5 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                                _iterator5.return();
	                            }
	                        } finally {
	                            if (_didIteratorError5) {
	                                throw _iteratorError5;
	                            }
	                        }
	                    }
	
	                    console.log(lineOutput);
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }]);
	
	    return Grid;
	}();
	
	exports.default = Grid;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Box = function () {
	    function Box(ref, value) {
	        _classCallCheck(this, Box);
	
	        this.ref = ref;
	        this.value = typeof value !== 'undefined' ? value : 0;
	        this.candidates = [];
	    }
	
	    _createClass(Box, [{
	        key: 'colRef',
	        get: function get() {
	            return this.ref.substr(0, 1);
	        }
	    }, {
	        key: 'rowRef',
	        get: function get() {
	            return this.ref.substr(1);
	        }
	    }, {
	        key: 'squareRef',
	        get: function get() {
	            if (this.rowRef <= 3) {
	                if (this.colRef <= 'C') return 1;else if (this.colRef <= 'F') return 2;else return 3;
	            } else if (this.rowRef <= 6) {
	                if (this.colRef <= 'C') return 4;else if (this.colRef <= 'F') return 5;else return 6;
	            } else {
	                if (this.colRef <= 'C') return 7;else if (this.colRef <= 'F') return 8;else return 9;
	            }
	        }
	    }]);
	
	    return Box;
	}();
	
	exports.default = Box;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * arr-diff <https://github.com/jonschlinkert/arr-diff>
	 *
	 * Copyright (c) 2014-2016, Jon Schlinkert.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var flatten = __webpack_require__(4);
	var slice = [].slice;
	
	module.exports = function(arr, arrays) {
	  arrays = flatten(slice.call(arguments, 1));
	  var len = arrays.length;
	  for (var i = 0; i < len; i++) {
	    remove(arr, arrays[i]);
	  }
	  return arr;
	};
	
	function remove(arr, ele) {
	  var idx = arr.indexOf(ele);
	  while (idx !== -1) {
	    arr.splice(idx, 1);
	    idx = arr.indexOf(ele);
	  }
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * arr-flatten <https://github.com/jonschlinkert/arr-flatten>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function flatten(arr) {
	  return flat(arr, []);
	};
	
	function flat(arr, res) {
	  var len = arr.length;
	  var i = -1;
	
	  while (len--) {
	    var cur = arr[++i];
	    if (Array.isArray(cur)) {
	      flat(cur, res);
	    } else {
	      res.push(cur);
	    }
	  }
	  return res;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * array-intersection <https://github.com/jonschlinkert/array-intersection>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var filter = __webpack_require__(6);
	var every = __webpack_require__(52);
	var unique = __webpack_require__(23);
	var slice = __webpack_require__(54);
	var indexOf = __webpack_require__(55);
	
	module.exports = function intersection(arr) {
	  if (arr == null) {
	    return [];
	  }
	
	  if (arguments.length === 1) {
	    return unique(arr);
	  }
	
	  var arrays = slice(arguments, 1);
	
	  return filter(unique(arr), function (ele) {
	    return every(arrays, function (cur) {
	      return indexOf(cur, ele) !== -1;
	    });
	  });
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * filter-array <https://github.com/jonschlinkert/filter-array>
	 *
	 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var typeOf = __webpack_require__(7);
	var filter = __webpack_require__(12);
	var mm = __webpack_require__(16);
	
	/**
	 * Filter array against given glob
	 * patterns, regex or given function.
	 *
	 * ```js
	 * var filter = require('filter-array');
	 *
	 * filter(['a', 'b', 'c', 'b', 'c', 'e'], function(ele) {
	 *   return ele === 'a' || ele === 'b';
	 * });
	 *
	 * //=> ['a', 'b', 'b']
	 * ```
	 *
	 * @name   filterArray
	 * @param  {Array} `arr` array to filter
	 * @param  {Array|String|Function|RegExp} `filters`
	 * @param  {Object} `opts` options to pass to [micromatch]
	 * @return {Array}
	 * @api public
	 */
	
	module.exports = function filterArray(arr, filters, opts) {
	  if (arr.length === 0) {
	    return [];
	  }
	
	  if (typeOf(filters) === 'function' || typeOf(filters) === 'regexp') {
	    var isMatch = mm.matcher(filters, opts);
	
	    return filter(arr, function _filter(val) {
	      return isMatch(val);
	    });
	  }
	
	  if (typeOf(filters) === 'string' || typeOf(filters) === 'array') {
	    return filter(arr, mm.filter(filters, opts));
	  }
	
	  return [];
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var toString = Object.prototype.toString;
	
	/**
	 * Get the native `typeof` a value.
	 *
	 * @param  {*} `val`
	 * @return {*} Native javascript type
	 */
	
	module.exports = function kindOf(val) {
	  if (val === undefined) {
	    return 'undefined';
	  }
	  if (val === null) {
	    return 'null';
	  }
	  if (val === true || val === false || val instanceof Boolean) {
	    return 'boolean';
	  }
	  if (typeof val !== 'object') {
	    return typeof val;
	  }
	  if (Array.isArray(val)) {
	    return 'array';
	  }
	
	  var type = toString.call(val);
	
	  if (val instanceof RegExp || type === '[object RegExp]') {
	    return 'regexp';
	  }
	  if (val instanceof Date || type === '[object Date]') {
	    return 'date';
	  }
	  if (type === '[object Function]') {
	    return 'function';
	  }
	  if (type === '[object Arguments]') {
	    return 'arguments';
	  }
	  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(val)) {
	    return 'buffer';
	  }
	  return type.slice(8, -1).toLowerCase();
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(9)
	var ieee754 = __webpack_require__(10)
	var isArray = __webpack_require__(11)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict'
	
	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}
	
	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63
	
	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}
	
	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)
	
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * arr-filter <https://github.com/jonschlinkert/arr-filter>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var iterator = __webpack_require__(13);
	
	module.exports = function filter(arr, cb, thisArg) {
	  if (arr == null) {
	    return [];
	  }
	
	  if (typeof cb !== 'function') {
	    throw new TypeError('arr-filter expects a callback function.');
	  }
	
	  cb = iterator(cb, thisArg);
	  var len = arr.length;
	  var res = arr.slice();
	  var i = 0;
	
	  while (len--) {
	    if (!cb(arr[len], i++)) {
	      res.splice(len, 1);
	    }
	  }
	
	  return res;
	};
	


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * make-iterator <https://github.com/jonschlinkert/make-iterator>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Copyright (c) 2012, 2013 moutjs team and contributors (http://moutjs.com)
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var typeOf = __webpack_require__(14);
	
	module.exports = function makeIterator(target, thisArg) {
	  switch (typeOf(target)) {
	    case 'undefined':
	    case 'null':
	      return noop;
	    case 'function':
	      // function is the first to improve perf (most common case)
	      // also avoid using `Function#call` if not needed, which boosts
	      // perf a lot in some cases
	      return (typeof thisArg !== 'undefined') ? function(val, i, arr) {
	        return target.call(thisArg, val, i, arr);
	      } : target;
	    case 'object':
	      return function(val) {
	        return deepMatches(val, target);
	      };
	    case 'regexp':
	      return function(str) {
	        return target.test(str);
	      };
	    case 'string':
	    case 'number':
	    default: {
	      return prop(target);
	    }
	  }
	};
	
	function containsMatch(array, value) {
	  var len = array.length;
	  var i = -1;
	
	  while (++i < len) {
	    if (deepMatches(array[i], value)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	function matchArray(arr, value) {
	  var len = value.length;
	  var i = -1;
	
	  while (++i < len) {
	    if (!containsMatch(arr, value[i])) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function matchObject(obj, value) {
	  for (var key in value) {
	    if (value.hasOwnProperty(key)) {
	      if (deepMatches(obj[key], value[key]) === false) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	/**
	 * Recursively compare objects
	 */
	
	function deepMatches(val, value) {
	  if (typeOf(val) === 'object') {
	    if (Array.isArray(val) && Array.isArray(value)) {
	      return matchArray(val, value);
	    } else {
	      return matchObject(val, value);
	    }
	  } else {
	    return isMatch(val, value);
	  }
	}
	
	function isMatch(target, val) {
	  return target === val;
	}
	
	function prop(name) {
	  return function(obj) {
	    return obj[name];
	  };
	}
	
	function noop(val) {
	  return val;
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var isBuffer = __webpack_require__(15);
	var toString = Object.prototype.toString;
	
	/**
	 * Get the native `typeof` a value.
	 *
	 * @param  {*} `val`
	 * @return {*} Native javascript type
	 */
	
	module.exports = function kindOf(val) {
	  // primitivies
	  if (typeof val === 'undefined') {
	    return 'undefined';
	  }
	  if (val === null) {
	    return 'null';
	  }
	  if (val === true || val === false || val instanceof Boolean) {
	    return 'boolean';
	  }
	  if (typeof val === 'string' || val instanceof String) {
	    return 'string';
	  }
	  if (typeof val === 'number' || val instanceof Number) {
	    return 'number';
	  }
	
	  // functions
	  if (typeof val === 'function' || val instanceof Function) {
	    return 'function';
	  }
	
	  // array
	  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
	    return 'array';
	  }
	
	  // check for instances of RegExp and Date before calling `toString`
	  if (val instanceof RegExp) {
	    return 'regexp';
	  }
	  if (val instanceof Date) {
	    return 'date';
	  }
	
	  // other objects
	  var type = toString.call(val);
	
	  if (type === '[object RegExp]') {
	    return 'regexp';
	  }
	  if (type === '[object Date]') {
	    return 'date';
	  }
	  if (type === '[object Arguments]') {
	    return 'arguments';
	  }
	
	  // buffer
	  if (typeof Buffer !== 'undefined' && isBuffer(val)) {
	    return 'buffer';
	  }
	
	  // es6: Map, WeakMap, Set, WeakSet
	  if (type === '[object Set]') {
	    return 'set';
	  }
	  if (type === '[object WeakSet]') {
	    return 'weakset';
	  }
	  if (type === '[object Map]') {
	    return 'map';
	  }
	  if (type === '[object WeakMap]') {
	    return 'weakmap';
	  }
	  if (type === '[object Symbol]') {
	    return 'symbol';
	  }
	
	  // typed arrays
	  if (type === '[object Int8Array]') {
	    return 'int8array';
	  }
	  if (type === '[object Uint8Array]') {
	    return 'uint8array';
	  }
	  if (type === '[object Uint8ClampedArray]') {
	    return 'uint8clampedarray';
	  }
	  if (type === '[object Int16Array]') {
	    return 'int16array';
	  }
	  if (type === '[object Uint16Array]') {
	    return 'uint16array';
	  }
	  if (type === '[object Int32Array]') {
	    return 'int32array';
	  }
	  if (type === '[object Uint32Array]') {
	    return 'uint32array';
	  }
	  if (type === '[object Float32Array]') {
	    return 'float32array';
	  }
	  if (type === '[object Float64Array]') {
	    return 'float64array';
	  }
	
	  // must be a plain object
	  return 'object';
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ },
/* 15 */
/***/ function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}
	
	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}
	
	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * micromatch <https://github.com/jonschlinkert/micromatch>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var expand = __webpack_require__(17);
	var utils = __webpack_require__(18);
	
	/**
	 * The main function. Pass an array of filepaths,
	 * and a string or array of glob patterns
	 *
	 * @param  {Array|String} `files`
	 * @param  {Array|String} `patterns`
	 * @param  {Object} `opts`
	 * @return {Array} Array of matches
	 */
	
	function micromatch(files, patterns, opts) {
	  if (!files || !patterns) return [];
	  opts = opts || {};
	
	  if (typeof opts.cache === 'undefined') {
	    opts.cache = true;
	  }
	
	  if (!Array.isArray(patterns)) {
	    return match(files, patterns, opts);
	  }
	
	  var len = patterns.length, i = 0;
	  var omit = [], keep = [];
	
	  while (len--) {
	    var glob = patterns[i++];
	    if (typeof glob === 'string' && glob.charCodeAt(0) === 33 /* ! */) {
	      omit.push.apply(omit, match(files, glob.slice(1), opts));
	    } else {
	      keep.push.apply(keep, match(files, glob, opts));
	    }
	  }
	  return utils.diff(keep, omit);
	}
	
	/**
	 * Return an array of files that match the given glob pattern.
	 *
	 * This function is called by the main `micromatch` function If you only
	 * need to pass a single pattern you might get very minor speed improvements
	 * using this function.
	 *
	 * @param  {Array} `files`
	 * @param  {String} `pattern`
	 * @param  {Object} `options`
	 * @return {Array}
	 */
	
	function match(files, pattern, opts) {
	  if (utils.typeOf(files) !== 'string' && !Array.isArray(files)) {
	    throw new Error(msg('match', 'files', 'a string or array'));
	  }
	
	  files = utils.arrayify(files);
	  opts = opts || {};
	
	  var negate = opts.negate || false;
	  var orig = pattern;
	
	  if (typeof pattern === 'string') {
	    negate = pattern.charAt(0) === '!';
	    if (negate) {
	      pattern = pattern.slice(1);
	    }
	
	    // we need to remove the character regardless,
	    // so the above logic is still needed
	    if (opts.nonegate === true) {
	      negate = false;
	    }
	  }
	
	  var _isMatch = matcher(pattern, opts);
	  var len = files.length, i = 0;
	  var res = [];
	
	  while (i < len) {
	    var file = files[i++];
	    var fp = utils.unixify(file, opts);
	
	    if (!_isMatch(fp)) { continue; }
	    res.push(fp);
	  }
	
	  if (res.length === 0) {
	    if (opts.failglob === true) {
	      throw new Error('micromatch.match() found no matches for: "' + orig + '".');
	    }
	
	    if (opts.nonull || opts.nullglob) {
	      res.push(utils.unescapeGlob(orig));
	    }
	  }
	
	  // if `negate` was defined, diff negated files
	  if (negate) { res = utils.diff(files, res); }
	
	  // if `ignore` was defined, diff ignored filed
	  if (opts.ignore && opts.ignore.length) {
	    pattern = opts.ignore;
	    opts = utils.omit(opts, ['ignore']);
	    res = utils.diff(res, micromatch(res, pattern, opts));
	  }
	
	  if (opts.nodupes) {
	    return utils.unique(res);
	  }
	  return res;
	}
	
	/**
	 * Returns a function that takes a glob pattern or array of glob patterns
	 * to be used with `Array#filter()`. (Internally this function generates
	 * the matching function using the [matcher] method).
	 *
	 * ```js
	 * var fn = mm.filter('[a-c]');
	 * ['a', 'b', 'c', 'd', 'e'].filter(fn);
	 * //=> ['a', 'b', 'c']
	 * ```
	 * @param  {String|Array} `patterns` Can be a glob or array of globs.
	 * @param  {Options} `opts` Options to pass to the [matcher] method.
	 * @return {Function} Filter function to be passed to `Array#filter()`.
	 */
	
	function filter(patterns, opts) {
	  if (!Array.isArray(patterns) && typeof patterns !== 'string') {
	    throw new TypeError(msg('filter', 'patterns', 'a string or array'));
	  }
	
	  patterns = utils.arrayify(patterns);
	  var len = patterns.length, i = 0;
	  var patternMatchers = Array(len);
	  while (i < len) {
	    patternMatchers[i] = matcher(patterns[i++], opts);
	  }
	
	  return function(fp) {
	    if (fp == null) return [];
	    var len = patternMatchers.length, i = 0;
	    var res = true;
	
	    fp = utils.unixify(fp, opts);
	    while (i < len) {
	      var fn = patternMatchers[i++];
	      if (!fn(fp)) {
	        res = false;
	        break;
	      }
	    }
	    return res;
	  };
	}
	
	/**
	 * Returns true if the filepath contains the given
	 * pattern. Can also return a function for matching.
	 *
	 * ```js
	 * isMatch('foo.md', '*.md', {});
	 * //=> true
	 *
	 * isMatch('*.md', {})('foo.md')
	 * //=> true
	 * ```
	 * @param  {String} `fp`
	 * @param  {String} `pattern`
	 * @param  {Object} `opts`
	 * @return {Boolean}
	 */
	
	function isMatch(fp, pattern, opts) {
	  if (typeof fp !== 'string') {
	    throw new TypeError(msg('isMatch', 'filepath', 'a string'));
	  }
	
	  fp = utils.unixify(fp, opts);
	  if (utils.typeOf(pattern) === 'object') {
	    return matcher(fp, pattern);
	  }
	  return matcher(pattern, opts)(fp);
	}
	
	/**
	 * Returns true if the filepath matches the
	 * given pattern.
	 */
	
	function contains(fp, pattern, opts) {
	  if (typeof fp !== 'string') {
	    throw new TypeError(msg('contains', 'pattern', 'a string'));
	  }
	
	  opts = opts || {};
	  opts.contains = (pattern !== '');
	  fp = utils.unixify(fp, opts);
	
	  if (opts.contains && !utils.isGlob(pattern)) {
	    return fp.indexOf(pattern) !== -1;
	  }
	  return matcher(pattern, opts)(fp);
	}
	
	/**
	 * Returns true if a file path matches any of the
	 * given patterns.
	 *
	 * @param  {String} `fp` The filepath to test.
	 * @param  {String|Array} `patterns` Glob patterns to use.
	 * @param  {Object} `opts` Options to pass to the `matcher()` function.
	 * @return {String}
	 */
	
	function any(fp, patterns, opts) {
	  if (!Array.isArray(patterns) && typeof patterns !== 'string') {
	    throw new TypeError(msg('any', 'patterns', 'a string or array'));
	  }
	
	  patterns = utils.arrayify(patterns);
	  var len = patterns.length;
	
	  fp = utils.unixify(fp, opts);
	  while (len--) {
	    var isMatch = matcher(patterns[len], opts);
	    if (isMatch(fp)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Filter the keys of an object with the given `glob` pattern
	 * and `options`
	 *
	 * @param  {Object} `object`
	 * @param  {Pattern} `object`
	 * @return {Array}
	 */
	
	function matchKeys(obj, glob, options) {
	  if (utils.typeOf(obj) !== 'object') {
	    throw new TypeError(msg('matchKeys', 'first argument', 'an object'));
	  }
	
	  var fn = matcher(glob, options);
	  var res = {};
	
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key) && fn(key)) {
	      res[key] = obj[key];
	    }
	  }
	  return res;
	}
	
	/**
	 * Return a function for matching based on the
	 * given `pattern` and `options`.
	 *
	 * @param  {String} `pattern`
	 * @param  {Object} `options`
	 * @return {Function}
	 */
	
	function matcher(pattern, opts) {
	  // pattern is a function
	  if (typeof pattern === 'function') {
	    return pattern;
	  }
	  // pattern is a regex
	  if (pattern instanceof RegExp) {
	    return function(fp) {
	      return pattern.test(fp);
	    };
	  }
	
	  if (typeof pattern !== 'string') {
	    throw new TypeError(msg('matcher', 'pattern', 'a string, regex, or function'));
	  }
	
	  // strings, all the way down...
	  pattern = utils.unixify(pattern, opts);
	
	  // pattern is a non-glob string
	  if (!utils.isGlob(pattern)) {
	    return utils.matchPath(pattern, opts);
	  }
	  // pattern is a glob string
	  var re = makeRe(pattern, opts);
	
	  // `matchBase` is defined
	  if (opts && opts.matchBase) {
	    return utils.hasFilename(re, opts);
	  }
	  // `matchBase` is not defined
	  return function(fp) {
	    fp = utils.unixify(fp, opts);
	    return re.test(fp);
	  };
	}
	
	/**
	 * Create and cache a regular expression for matching
	 * file paths.
	 *
	 * If the leading character in the `glob` is `!`, a negation
	 * regex is returned.
	 *
	 * @param  {String} `glob`
	 * @param  {Object} `options`
	 * @return {RegExp}
	 */
	
	function toRegex(glob, options) {
	  // clone options to prevent  mutating the original object
	  var opts = Object.create(options || {});
	  var flags = opts.flags || '';
	  if (opts.nocase && flags.indexOf('i') === -1) {
	    flags += 'i';
	  }
	
	  var parsed = expand(glob, opts);
	
	  // pass in tokens to avoid parsing more than once
	  opts.negated = opts.negated || parsed.negated;
	  opts.negate = opts.negated;
	  glob = wrapGlob(parsed.pattern, opts);
	  var re;
	
	  try {
	    re = new RegExp(glob, flags);
	    return re;
	  } catch (err) {
	    err.reason = 'micromatch invalid regex: (' + re + ')';
	    if (opts.strict) throw new SyntaxError(err);
	  }
	
	  // we're only here if a bad pattern was used and the user
	  // passed `options.silent`, so match nothing
	  return /$^/;
	}
	
	/**
	 * Create the regex to do the matching. If the leading
	 * character in the `glob` is `!` a negation regex is returned.
	 *
	 * @param {String} `glob`
	 * @param {Boolean} `negate`
	 */
	
	function wrapGlob(glob, opts) {
	  var prefix = (opts && !opts.contains) ? '^' : '';
	  var after = (opts && !opts.contains) ? '$' : '';
	  glob = ('(?:' + glob + ')' + after);
	  if (opts && opts.negate) {
	    return prefix + ('(?!^' + glob + ').*$');
	  }
	  return prefix + glob;
	}
	
	/**
	 * Create and cache a regular expression for matching file paths.
	 * If the leading character in the `glob` is `!`, a negation
	 * regex is returned.
	 *
	 * @param  {String} `glob`
	 * @param  {Object} `options`
	 * @return {RegExp}
	 */
	
	function makeRe(glob, opts) {
	  if (utils.typeOf(glob) !== 'string') {
	    throw new Error(msg('makeRe', 'glob', 'a string'));
	  }
	  return utils.cache(toRegex, glob, opts);
	}
	
	/**
	 * Make error messages consistent. Follows this format:
	 *
	 * ```js
	 * msg(methodName, argNumber, nativeType);
	 * // example:
	 * msg('matchKeys', 'first', 'an object');
	 * ```
	 *
	 * @param  {String} `method`
	 * @param  {String} `num`
	 * @param  {String} `type`
	 * @return {String}
	 */
	
	function msg(method, what, type) {
	  return 'micromatch.' + method + '(): ' + what + ' should be ' + type + '.';
	}
	
	/**
	 * Public methods
	 */
	
	/* eslint no-multi-spaces: 0 */
	micromatch.any       = any;
	micromatch.braces    = micromatch.braceExpand = utils.braces;
	micromatch.contains  = contains;
	micromatch.expand    = expand;
	micromatch.filter    = filter;
	micromatch.isMatch   = isMatch;
	micromatch.makeRe    = makeRe;
	micromatch.match     = match;
	micromatch.matcher   = matcher;
	micromatch.matchKeys = matchKeys;
	
	/**
	 * Expose `micromatch`
	 */
	
	module.exports = micromatch;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * micromatch <https://github.com/jonschlinkert/micromatch>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var utils = __webpack_require__(18);
	var Glob = __webpack_require__(50);
	
	/**
	 * Expose `expand`
	 */
	
	module.exports = expand;
	
	/**
	 * Expand a glob pattern to resolve braces and
	 * similar patterns before converting to regex.
	 *
	 * @param  {String|Array} `pattern`
	 * @param  {Array} `files`
	 * @param  {Options} `opts`
	 * @return {Array}
	 */
	
	function expand(pattern, options) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('micromatch.expand(): argument should be a string.');
	  }
	
	  var glob = new Glob(pattern, options || {});
	  var opts = glob.options;
	
	  if (!utils.isGlob(pattern)) {
	    glob.pattern = glob.pattern.replace(/([\/.])/g, '\\$1');
	    return glob;
	  }
	
	  glob.pattern = glob.pattern.replace(/(\+)(?!\()/g, '\\$1');
	  glob.pattern = glob.pattern.split('$').join('\\$');
	
	  if (typeof opts.braces !== 'boolean' && typeof opts.nobraces !== 'boolean') {
	    opts.braces = true;
	  }
	
	  if (glob.pattern === '.*') {
	    return {
	      pattern: '\\.' + star,
	      tokens: tok,
	      options: opts
	    };
	  }
	
	  if (glob.pattern === '*') {
	    return {
	      pattern: oneStar(opts.dot),
	      tokens: tok,
	      options: opts
	    };
	  }
	
	  // parse the glob pattern into tokens
	  glob.parse();
	  var tok = glob.tokens;
	  tok.is.negated = opts.negated;
	
	  // dotfile handling
	  if ((opts.dotfiles === true || tok.is.dotfile) && opts.dot !== false) {
	    opts.dotfiles = true;
	    opts.dot = true;
	  }
	
	  if ((opts.dotdirs === true || tok.is.dotdir) && opts.dot !== false) {
	    opts.dotdirs = true;
	    opts.dot = true;
	  }
	
	  // check for braces with a dotfile pattern
	  if (/[{,]\./.test(glob.pattern)) {
	    opts.makeRe = false;
	    opts.dot = true;
	  }
	
	  if (opts.nonegate !== true) {
	    opts.negated = glob.negated;
	  }
	
	  // if the leading character is a dot or a slash, escape it
	  if (glob.pattern.charAt(0) === '.' && glob.pattern.charAt(1) !== '/') {
	    glob.pattern = '\\' + glob.pattern;
	  }
	
	  /**
	   * Extended globs
	   */
	
	  // expand braces, e.g `{1..5}`
	  glob.track('before braces');
	  if (tok.is.braces) {
	    glob.braces();
	  }
	  glob.track('after braces');
	
	  // expand extglobs, e.g `foo/!(a|b)`
	  glob.track('before extglob');
	  if (tok.is.extglob) {
	    glob.extglob();
	  }
	  glob.track('after extglob');
	
	  // expand brackets, e.g `[[:alpha:]]`
	  glob.track('before brackets');
	  if (tok.is.brackets) {
	    glob.brackets();
	  }
	  glob.track('after brackets');
	
	  // special patterns
	  glob._replace('[!', '[^');
	  glob._replace('(?', '(%~');
	  glob._replace(/\[\]/, '\\[\\]');
	  glob._replace('/[', '/' + (opts.dot ? dotfiles : nodot) + '[', true);
	  glob._replace('/?', '/' + (opts.dot ? dotfiles : nodot) + '[^/]', true);
	  glob._replace('/.', '/(?=.)\\.', true);
	
	  // windows drives
	  glob._replace(/^(\w):([\\\/]+?)/gi, '(?=.)$1:$2', true);
	
	  // negate slashes in exclusion ranges
	  if (glob.pattern.indexOf('[^') !== -1) {
	    glob.pattern = negateSlash(glob.pattern);
	  }
	
	  if (opts.globstar !== false && glob.pattern === '**') {
	    glob.pattern = globstar(opts.dot);
	
	  } else {
	    glob.pattern = balance(glob.pattern, '[', ']');
	    glob.escape(glob.pattern);
	
	    // if the pattern has `**`
	    if (tok.is.globstar) {
	      glob.pattern = collapse(glob.pattern, '/**');
	      glob.pattern = collapse(glob.pattern, '**/');
	      glob._replace('/**/', '(?:/' + globstar(opts.dot) + '/|/)', true);
	      glob._replace(/\*{2,}/g, '**');
	
	      // 'foo/*'
	      glob._replace(/(\w+)\*(?!\/)/g, '$1[^/]*?', true);
	      glob._replace(/\*\*\/\*(\w)/g, globstar(opts.dot) + '\\/' + (opts.dot ? dotfiles : nodot) + '[^/]*?$1', true);
	
	      if (opts.dot !== true) {
	        glob._replace(/\*\*\/(.)/g, '(?:**\\/|)$1');
	      }
	
	      // 'foo/**' or '{**,*}', but not 'foo**'
	      if (tok.path.dirname !== '' || /,\*\*|\*\*,/.test(glob.orig)) {
	        glob._replace('**', globstar(opts.dot), true);
	      }
	    }
	
	    // ends with /*
	    glob._replace(/\/\*$/, '\\/' + oneStar(opts.dot), true);
	    // ends with *, no slashes
	    glob._replace(/(?!\/)\*$/, star, true);
	    // has 'n*.' (partial wildcard w/ file extension)
	    glob._replace(/([^\/]+)\*/, '$1' + oneStar(true), true);
	    // has '*'
	    glob._replace('*', oneStar(opts.dot), true);
	    glob._replace('?.', '?\\.', true);
	    glob._replace('?:', '?:', true);
	
	    glob._replace(/\?+/g, function(match) {
	      var len = match.length;
	      if (len === 1) {
	        return qmark;
	      }
	      return qmark + '{' + len + '}';
	    });
	
	    // escape '.abc' => '\\.abc'
	    glob._replace(/\.([*\w]+)/g, '\\.$1');
	    // fix '[^\\\\/]'
	    glob._replace(/\[\^[\\\/]+\]/g, qmark);
	    // '///' => '\/'
	    glob._replace(/\/+/g, '\\/');
	    // '\\\\\\' => '\\'
	    glob._replace(/\\{2,}/g, '\\');
	  }
	
	  // unescape previously escaped patterns
	  glob.unescape(glob.pattern);
	  glob._replace('__UNESC_STAR__', '*');
	
	  // escape dots that follow qmarks
	  glob._replace('?.', '?\\.');
	
	  // remove unnecessary slashes in character classes
	  glob._replace('[^\\/]', qmark);
	
	  if (glob.pattern.length > 1) {
	    if (/^[\[?*]/.test(glob.pattern)) {
	      // only prepend the string if we don't want to match dotfiles
	      glob.pattern = (opts.dot ? dotfiles : nodot) + glob.pattern;
	    }
	  }
	
	  return glob;
	}
	
	/**
	 * Collapse repeated character sequences.
	 *
	 * ```js
	 * collapse('a/../../../b', '../');
	 * //=> 'a/../b'
	 * ```
	 *
	 * @param  {String} `str`
	 * @param  {String} `ch` Character sequence to collapse
	 * @return {String}
	 */
	
	function collapse(str, ch) {
	  var res = str.split(ch);
	  var isFirst = res[0] === '';
	  var isLast = res[res.length - 1] === '';
	  res = res.filter(Boolean);
	  if (isFirst) res.unshift('');
	  if (isLast) res.push('');
	  return res.join(ch);
	}
	
	/**
	 * Negate slashes in exclusion ranges, per glob spec:
	 *
	 * ```js
	 * negateSlash('[^foo]');
	 * //=> '[^\\/foo]'
	 * ```
	 *
	 * @param  {String} `str` glob pattern
	 * @return {String}
	 */
	
	function negateSlash(str) {
	  return str.replace(/\[\^([^\]]*?)\]/g, function(match, inner) {
	    if (inner.indexOf('/') === -1) {
	      inner = '\\/' + inner;
	    }
	    return '[^' + inner + ']';
	  });
	}
	
	/**
	 * Escape imbalanced braces/bracket. This is a very
	 * basic, naive implementation that only does enough
	 * to serve the purpose.
	 */
	
	function balance(str, a, b) {
	  var aarr = str.split(a);
	  var alen = aarr.join('').length;
	  var blen = str.split(b).join('').length;
	
	  if (alen !== blen) {
	    str = aarr.join('\\' + a);
	    return str.split(b).join('\\' + b);
	  }
	  return str;
	}
	
	/**
	 * Special patterns to be converted to regex.
	 * Heuristics are used to simplify patterns
	 * and speed up processing.
	 */
	
	/* eslint no-multi-spaces: 0 */
	var qmark       = '[^/]';
	var star        = qmark + '*?';
	var nodot       = '(?!\\.)(?=.)';
	var dotfileGlob = '(?:\\/|^)\\.{1,2}($|\\/)';
	var dotfiles    = '(?!' + dotfileGlob + ')(?=.)';
	var twoStarDot  = '(?:(?!' + dotfileGlob + ').)*?';
	
	/**
	 * Create a regex for `*`.
	 *
	 * If `dot` is true, or the pattern does not begin with
	 * a leading star, then return the simpler regex.
	 */
	
	function oneStar(dotfile) {
	  return dotfile ? '(?!' + dotfileGlob + ')(?=.)' + star : (nodot + star);
	}
	
	function globstar(dotfile) {
	  if (dotfile) { return twoStarDot; }
	  return '(?:(?!(?:\\/|^)\\.).)*?';
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var win32 = process && process.platform === 'win32';
	var path = __webpack_require__(20);
	var fileRe = __webpack_require__(21);
	var utils = module.exports;
	
	/**
	 * Module dependencies
	 */
	
	utils.diff = __webpack_require__(22);
	utils.unique = __webpack_require__(23);
	utils.braces = __webpack_require__(24);
	utils.brackets = __webpack_require__(33);
	utils.extglob = __webpack_require__(35);
	utils.isExtglob = __webpack_require__(36);
	utils.isGlob = __webpack_require__(37);
	utils.typeOf = __webpack_require__(14);
	utils.normalize = __webpack_require__(38);
	utils.omit = __webpack_require__(39);
	utils.parseGlob = __webpack_require__(43);
	utils.cache = __webpack_require__(47);
	
	/**
	 * Get the filename of a filepath
	 *
	 * @param {String} `string`
	 * @return {String}
	 */
	
	utils.filename = function filename(fp) {
	  var seg = fp.match(fileRe());
	  return seg && seg[0];
	};
	
	/**
	 * Returns a function that returns true if the given
	 * pattern is the same as a given `filepath`
	 *
	 * @param {String} `pattern`
	 * @return {Function}
	 */
	
	utils.isPath = function isPath(pattern, opts) {
	  opts = opts || {};
	  return function(fp) {
	    var unixified = utils.unixify(fp, opts);
	    if(opts.nocase){
	      return pattern.toLowerCase() === unixified.toLowerCase();
	    }
	    return pattern === unixified;
	  };
	};
	
	/**
	 * Returns a function that returns true if the given
	 * pattern contains a `filepath`
	 *
	 * @param {String} `pattern`
	 * @return {Function}
	 */
	
	utils.hasPath = function hasPath(pattern, opts) {
	  return function(fp) {
	    return utils.unixify(pattern, opts).indexOf(fp) !== -1;
	  };
	};
	
	/**
	 * Returns a function that returns true if the given
	 * pattern matches or contains a `filepath`
	 *
	 * @param {String} `pattern`
	 * @return {Function}
	 */
	
	utils.matchPath = function matchPath(pattern, opts) {
	  var fn = (opts && opts.contains)
	    ? utils.hasPath(pattern, opts)
	    : utils.isPath(pattern, opts);
	  return fn;
	};
	
	/**
	 * Returns a function that returns true if the given
	 * regex matches the `filename` of a file path.
	 *
	 * @param {RegExp} `re`
	 * @return {Boolean}
	 */
	
	utils.hasFilename = function hasFilename(re) {
	  return function(fp) {
	    var name = utils.filename(fp);
	    return name && re.test(name);
	  };
	};
	
	/**
	 * Coerce `val` to an array
	 *
	 * @param  {*} val
	 * @return {Array}
	 */
	
	utils.arrayify = function arrayify(val) {
	  return !Array.isArray(val)
	    ? [val]
	    : val;
	};
	
	/**
	 * Normalize all slashes in a file path or glob pattern to
	 * forward slashes.
	 */
	
	utils.unixify = function unixify(fp, opts) {
	  if (opts && opts.unixify === false) return fp;
	  if (opts && opts.unixify === true || win32 || path.sep === '\\') {
	    return utils.normalize(fp, false);
	  }
	  if (opts && opts.unescape === true) {
	    return fp ? fp.toString().replace(/\\(\w)/g, '$1') : '';
	  }
	  return fp;
	};
	
	/**
	 * Escape/unescape utils
	 */
	
	utils.escapePath = function escapePath(fp) {
	  return fp.replace(/[\\.]/g, '\\$&');
	};
	
	utils.unescapeGlob = function unescapeGlob(fp) {
	  return fp.replace(/[\\"']/g, '');
	};
	
	utils.escapeRe = function escapeRe(str) {
	  return str.replace(/[-[\\$*+?.#^\s{}(|)\]]/g, '\\$&');
	};
	
	/**
	 * Expose `utils`
	 */
	
	module.exports = utils;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 19 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ },
/* 21 */
/***/ function(module, exports) {

	/*!
	 * filename-regex <https://github.com/regexps/filename-regex>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert
	 * Licensed under the MIT license.
	 */
	
	module.exports = function filenameRegex() {
	  return /([^\\\/]+)$/;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * arr-diff <https://github.com/jonschlinkert/arr-diff>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var flatten = __webpack_require__(4);
	var slice = [].slice;
	
	/**
	 * Return the difference between the first array and
	 * additional arrays.
	 *
	 * ```js
	 * var diff = require('{%= name %}');
	 *
	 * var a = ['a', 'b', 'c', 'd'];
	 * var b = ['b', 'c'];
	 *
	 * console.log(diff(a, b))
	 * //=> ['a', 'd']
	 * ```
	 *
	 * @param  {Array} `a`
	 * @param  {Array} `b`
	 * @return {Array}
	 * @api public
	 */
	
	function diff(arr, arrays) {
	  var argsLen = arguments.length;
	  var len = arr.length, i = -1;
	  var res = [], arrays;
	
	  if (argsLen === 1) {
	    return arr;
	  }
	
	  if (argsLen > 2) {
	    arrays = flatten(slice.call(arguments, 1));
	  }
	
	  while (++i < len) {
	    if (!~arrays.indexOf(arr[i])) {
	      res.push(arr[i]);
	    }
	  }
	  return res;
	}
	
	/**
	 * Expose `diff`
	 */
	
	module.exports = diff;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/*!
	 * array-unique <https://github.com/jonschlinkert/array-unique>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function unique(arr) {
	  if (!Array.isArray(arr)) {
	    throw new TypeError('array-unique expects an array.');
	  }
	
	  var len = arr.length;
	  var i = -1;
	
	  while (i++ < len) {
	    var j = i + 1;
	
	    for (; j < arr.length; ++j) {
	      if (arr[i] === arr[j]) {
	        arr.splice(j--, 1);
	      }
	    }
	  }
	  return arr;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * braces <https://github.com/jonschlinkert/braces>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	/**
	 * Module dependencies
	 */
	
	var expand = __webpack_require__(25);
	var repeat = __webpack_require__(31);
	var tokens = __webpack_require__(32);
	
	/**
	 * Expose `braces`
	 */
	
	module.exports = function(str, options) {
	  if (typeof str !== 'string') {
	    throw new Error('braces expects a string');
	  }
	  return braces(str, options);
	};
	
	/**
	 * Expand `{foo,bar}` or `{1..5}` braces in the
	 * given `string`.
	 *
	 * @param  {String} `str`
	 * @param  {Array} `arr`
	 * @param  {Object} `options`
	 * @return {Array}
	 */
	
	function braces(str, arr, options) {
	  if (str === '') {
	    return [];
	  }
	
	  if (!Array.isArray(arr)) {
	    options = arr;
	    arr = [];
	  }
	
	  var opts = options || {};
	  arr = arr || [];
	
	  if (typeof opts.nodupes === 'undefined') {
	    opts.nodupes = true;
	  }
	
	  var fn = opts.fn;
	  var es6;
	
	  if (typeof opts === 'function') {
	    fn = opts;
	    opts = {};
	  }
	
	  if (!(patternRe instanceof RegExp)) {
	    patternRe = patternRegex();
	  }
	
	  var matches = str.match(patternRe) || [];
	  var m = matches[0];
	
	  switch(m) {
	    case '\\,':
	      return escapeCommas(str, arr, opts);
	    case '\\.':
	      return escapeDots(str, arr, opts);
	    case '\/.':
	      return escapePaths(str, arr, opts);
	    case ' ':
	      return splitWhitespace(str);
	    case '{,}':
	      return exponential(str, opts, braces);
	    case '{}':
	      return emptyBraces(str, arr, opts);
	    case '\\{':
	    case '\\}':
	      return escapeBraces(str, arr, opts);
	    case '${':
	      if (!/\{[^{]+\{/.test(str)) {
	        return arr.concat(str);
	      } else {
	        es6 = true;
	        str = tokens.before(str, es6Regex());
	      }
	  }
	
	  if (!(braceRe instanceof RegExp)) {
	    braceRe = braceRegex();
	  }
	
	  var match = braceRe.exec(str);
	  if (match == null) {
	    return [str];
	  }
	
	  var outter = match[1];
	  var inner = match[2];
	  if (inner === '') { return [str]; }
	
	  var segs, segsLength;
	
	  if (inner.indexOf('..') !== -1) {
	    segs = expand(inner, opts, fn) || inner.split(',');
	    segsLength = segs.length;
	
	  } else if (inner[0] === '"' || inner[0] === '\'') {
	    return arr.concat(str.split(/['"]/).join(''));
	
	  } else {
	    segs = inner.split(',');
	    if (opts.makeRe) {
	      return braces(str.replace(outter, wrap(segs, '|')), opts);
	    }
	
	    segsLength = segs.length;
	    if (segsLength === 1 && opts.bash) {
	      segs[0] = wrap(segs[0], '\\');
	    }
	  }
	
	  var len = segs.length;
	  var i = 0, val;
	
	  while (len--) {
	    var path = segs[i++];
	
	    if (/(\.[^.\/])/.test(path)) {
	      if (segsLength > 1) {
	        return segs;
	      } else {
	        return [str];
	      }
	    }
	
	    val = splice(str, outter, path);
	
	    if (/\{[^{}]+?\}/.test(val)) {
	      arr = braces(val, arr, opts);
	    } else if (val !== '') {
	      if (opts.nodupes && arr.indexOf(val) !== -1) { continue; }
	      arr.push(es6 ? tokens.after(val) : val);
	    }
	  }
	
	  if (opts.strict) { return filter(arr, filterEmpty); }
	  return arr;
	}
	
	/**
	 * Expand exponential ranges
	 *
	 *   `a{,}{,}` => ['a', 'a', 'a', 'a']
	 */
	
	function exponential(str, options, fn) {
	  if (typeof options === 'function') {
	    fn = options;
	    options = null;
	  }
	
	  var opts = options || {};
	  var esc = '__ESC_EXP__';
	  var exp = 0;
	  var res;
	
	  var parts = str.split('{,}');
	  if (opts.nodupes) {
	    return fn(parts.join(''), opts);
	  }
	
	  exp = parts.length - 1;
	  res = fn(parts.join(esc), opts);
	  var len = res.length;
	  var arr = [];
	  var i = 0;
	
	  while (len--) {
	    var ele = res[i++];
	    var idx = ele.indexOf(esc);
	
	    if (idx === -1) {
	      arr.push(ele);
	
	    } else {
	      ele = ele.split('__ESC_EXP__').join('');
	      if (!!ele && opts.nodupes !== false) {
	        arr.push(ele);
	
	      } else {
	        var num = Math.pow(2, exp);
	        arr.push.apply(arr, repeat(ele, num));
	      }
	    }
	  }
	  return arr;
	}
	
	/**
	 * Wrap a value with parens, brackets or braces,
	 * based on the given character/separator.
	 *
	 * @param  {String|Array} `val`
	 * @param  {String} `ch`
	 * @return {String}
	 */
	
	function wrap(val, ch) {
	  if (ch === '|') {
	    return '(' + val.join(ch) + ')';
	  }
	  if (ch === ',') {
	    return '{' + val.join(ch) + '}';
	  }
	  if (ch === '-') {
	    return '[' + val.join(ch) + ']';
	  }
	  if (ch === '\\') {
	    return '\\{' + val + '\\}';
	  }
	}
	
	/**
	 * Handle empty braces: `{}`
	 */
	
	function emptyBraces(str, arr, opts) {
	  return braces(str.split('{}').join('\\{\\}'), arr, opts);
	}
	
	/**
	 * Filter out empty-ish values
	 */
	
	function filterEmpty(ele) {
	  return !!ele && ele !== '\\';
	}
	
	/**
	 * Handle patterns with whitespace
	 */
	
	function splitWhitespace(str) {
	  var segs = str.split(' ');
	  var len = segs.length;
	  var res = [];
	  var i = 0;
	
	  while (len--) {
	    res.push.apply(res, braces(segs[i++]));
	  }
	  return res;
	}
	
	/**
	 * Handle escaped braces: `\\{foo,bar}`
	 */
	
	function escapeBraces(str, arr, opts) {
	  if (!/\{[^{]+\{/.test(str)) {
	    return arr.concat(str.split('\\').join(''));
	  } else {
	    str = str.split('\\{').join('__LT_BRACE__');
	    str = str.split('\\}').join('__RT_BRACE__');
	    return map(braces(str, arr, opts), function(ele) {
	      ele = ele.split('__LT_BRACE__').join('{');
	      return ele.split('__RT_BRACE__').join('}');
	    });
	  }
	}
	
	/**
	 * Handle escaped dots: `{1\\.2}`
	 */
	
	function escapeDots(str, arr, opts) {
	  if (!/[^\\]\..+\\\./.test(str)) {
	    return arr.concat(str.split('\\').join(''));
	  } else {
	    str = str.split('\\.').join('__ESC_DOT__');
	    return map(braces(str, arr, opts), function(ele) {
	      return ele.split('__ESC_DOT__').join('.');
	    });
	  }
	}
	
	/**
	 * Handle escaped dots: `{1\\.2}`
	 */
	
	function escapePaths(str, arr, opts) {
	  str = str.split('\/.').join('__ESC_PATH__');
	  return map(braces(str, arr, opts), function(ele) {
	    return ele.split('__ESC_PATH__').join('\/.');
	  });
	}
	
	/**
	 * Handle escaped commas: `{a\\,b}`
	 */
	
	function escapeCommas(str, arr, opts) {
	  if (!/\w,/.test(str)) {
	    return arr.concat(str.split('\\').join(''));
	  } else {
	    str = str.split('\\,').join('__ESC_COMMA__');
	    return map(braces(str, arr, opts), function(ele) {
	      return ele.split('__ESC_COMMA__').join(',');
	    });
	  }
	}
	
	/**
	 * Regex for common patterns
	 */
	
	function patternRegex() {
	  return /\${|( (?=[{,}])|(?=[{,}]) )|{}|{,}|\\,(?=.*[{}])|\/\.(?=.*[{}])|\\\.(?={)|\\{|\\}/;
	}
	
	/**
	 * Braces regex.
	 */
	
	function braceRegex() {
	  return /.*(\\?\{([^}]+)\})/;
	}
	
	/**
	 * es6 delimiter regex.
	 */
	
	function es6Regex() {
	  return /\$\{([^}]+)\}/;
	}
	
	var braceRe;
	var patternRe;
	
	/**
	 * Faster alternative to `String.replace()` when the
	 * index of the token to be replaces can't be supplied
	 */
	
	function splice(str, token, replacement) {
	  var i = str.indexOf(token);
	  return str.substr(0, i) + replacement
	    + str.substr(i + token.length);
	}
	
	/**
	 * Fast array map
	 */
	
	function map(arr, fn) {
	  if (arr == null) {
	    return [];
	  }
	
	  var len = arr.length;
	  var res = new Array(len);
	  var i = -1;
	
	  while (++i < len) {
	    res[i] = fn(arr[i], i, arr);
	  }
	
	  return res;
	}
	
	/**
	 * Fast array filter
	 */
	
	function filter(arr, cb) {
	  if (arr == null) return [];
	  if (typeof cb !== 'function') {
	    throw new TypeError('braces: filter expects a callback function.');
	  }
	
	  var len = arr.length;
	  var res = arr.slice();
	  var i = 0;
	
	  while (len--) {
	    if (!cb(arr[len], i++)) {
	      res.splice(len, 1);
	    }
	  }
	  return res;
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * expand-range <https://github.com/jonschlinkert/expand-range>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	var fill = __webpack_require__(26);
	
	module.exports = function expandRange(str, options, fn) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expand-range expects a string.');
	  }
	
	  if (typeof options === 'function') {
	    fn = options;
	    options = {};
	  }
	
	  if (typeof options === 'boolean') {
	    options = {};
	    options.makeRe = true;
	  }
	
	  // create arguments to pass to fill-range
	  var opts = options || {};
	  var args = str.split('..');
	  var len = args.length;
	  if (len > 3) { return str; }
	
	  // if only one argument, it can't expand so return it
	  if (len === 1) { return args; }
	
	  // if `true`, tell fill-range to regexify the string
	  if (typeof fn === 'boolean' && fn === true) {
	    opts.makeRe = true;
	  }
	
	  args.push(opts);
	  return fill.apply(null, args.concat(fn));
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * fill-range <https://github.com/jonschlinkert/fill-range>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(27);
	var isNumber = __webpack_require__(28);
	var randomize = __webpack_require__(29);
	var repeatStr = __webpack_require__(30);
	var repeat = __webpack_require__(31);
	
	/**
	 * Expose `fillRange`
	 */
	
	module.exports = fillRange;
	
	/**
	 * Return a range of numbers or letters.
	 *
	 * @param  {String} `a` Start of the range
	 * @param  {String} `b` End of the range
	 * @param  {String} `step` Increment or decrement to use.
	 * @param  {Function} `fn` Custom function to modify each element in the range.
	 * @return {Array}
	 */
	
	function fillRange(a, b, step, options, fn) {
	  if (a == null || b == null) {
	    throw new Error('fill-range expects the first and second args to be strings.');
	  }
	
	  if (typeof step === 'function') {
	    fn = step; options = {}; step = null;
	  }
	
	  if (typeof options === 'function') {
	    fn = options; options = {};
	  }
	
	  if (isObject(step)) {
	    options = step; step = '';
	  }
	
	  var expand, regex = false, sep = '';
	  var opts = options || {};
	
	  if (typeof opts.silent === 'undefined') {
	    opts.silent = true;
	  }
	
	  step = step || opts.step;
	
	  // store a ref to unmodified arg
	  var origA = a, origB = b;
	
	  b = (b.toString() === '-0') ? 0 : b;
	
	  if (opts.optimize || opts.makeRe) {
	    step = step ? (step += '~') : step;
	    expand = true;
	    regex = true;
	    sep = '~';
	  }
	
	  // handle special step characters
	  if (typeof step === 'string') {
	    var match = stepRe().exec(step);
	
	    if (match) {
	      var i = match.index;
	      var m = match[0];
	
	      // repeat string
	      if (m === '+') {
	        return repeat(a, b);
	
	      // randomize a, `b` times
	      } else if (m === '?') {
	        return [randomize(a, b)];
	
	      // expand right, no regex reduction
	      } else if (m === '>') {
	        step = step.substr(0, i) + step.substr(i + 1);
	        expand = true;
	
	      // expand to an array, or if valid create a reduced
	      // string for a regex logic `or`
	      } else if (m === '|') {
	        step = step.substr(0, i) + step.substr(i + 1);
	        expand = true;
	        regex = true;
	        sep = m;
	
	      // expand to an array, or if valid create a reduced
	      // string for a regex range
	      } else if (m === '~') {
	        step = step.substr(0, i) + step.substr(i + 1);
	        expand = true;
	        regex = true;
	        sep = m;
	      }
	    } else if (!isNumber(step)) {
	      if (!opts.silent) {
	        throw new TypeError('fill-range: invalid step.');
	      }
	      return null;
	    }
	  }
	
	  if (/[.&*()[\]^%$#@!]/.test(a) || /[.&*()[\]^%$#@!]/.test(b)) {
	    if (!opts.silent) {
	      throw new RangeError('fill-range: invalid range arguments.');
	    }
	    return null;
	  }
	
	  // has neither a letter nor number, or has both letters and numbers
	  // this needs to be after the step logic
	  if (!noAlphaNum(a) || !noAlphaNum(b) || hasBoth(a) || hasBoth(b)) {
	    if (!opts.silent) {
	      throw new RangeError('fill-range: invalid range arguments.');
	    }
	    return null;
	  }
	
	  // validate arguments
	  var isNumA = isNumber(zeros(a));
	  var isNumB = isNumber(zeros(b));
	
	  if ((!isNumA && isNumB) || (isNumA && !isNumB)) {
	    if (!opts.silent) {
	      throw new TypeError('fill-range: first range argument is incompatible with second.');
	    }
	    return null;
	  }
	
	  // by this point both are the same, so we
	  // can use A to check going forward.
	  var isNum = isNumA;
	  var num = formatStep(step);
	
	  // is the range alphabetical? or numeric?
	  if (isNum) {
	    // if numeric, coerce to an integer
	    a = +a; b = +b;
	  } else {
	    // otherwise, get the charCode to expand alpha ranges
	    a = a.charCodeAt(0);
	    b = b.charCodeAt(0);
	  }
	
	  // is the pattern descending?
	  var isDescending = a > b;
	
	  // don't create a character class if the args are < 0
	  if (a < 0 || b < 0) {
	    expand = false;
	    regex = false;
	  }
	
	  // detect padding
	  var padding = isPadded(origA, origB);
	  var res, pad, arr = [];
	  var ii = 0;
	
	  // character classes, ranges and logical `or`
	  if (regex) {
	    if (shouldExpand(a, b, num, isNum, padding, opts)) {
	      // make sure the correct separator is used
	      if (sep === '|' || sep === '~') {
	        sep = detectSeparator(a, b, num, isNum, isDescending);
	      }
	      return wrap([origA, origB], sep, opts);
	    }
	  }
	
	  while (isDescending ? (a >= b) : (a <= b)) {
	    if (padding && isNum) {
	      pad = padding(a);
	    }
	
	    // custom function
	    if (typeof fn === 'function') {
	      res = fn(a, isNum, pad, ii++);
	
	    // letters
	    } else if (!isNum) {
	      if (regex && isInvalidChar(a)) {
	        res = null;
	      } else {
	        res = String.fromCharCode(a);
	      }
	
	    // numbers
	    } else {
	      res = formatPadding(a, pad);
	    }
	
	    // add result to the array, filtering any nulled values
	    if (res !== null) arr.push(res);
	
	    // increment or decrement
	    if (isDescending) {
	      a -= num;
	    } else {
	      a += num;
	    }
	  }
	
	  // now that the array is expanded, we need to handle regex
	  // character classes, ranges or logical `or` that wasn't
	  // already handled before the loop
	  if ((regex || expand) && !opts.noexpand) {
	    // make sure the correct separator is used
	    if (sep === '|' || sep === '~') {
	      sep = detectSeparator(a, b, num, isNum, isDescending);
	    }
	    if (arr.length === 1 || a < 0 || b < 0) { return arr; }
	    return wrap(arr, sep, opts);
	  }
	
	  return arr;
	}
	
	/**
	 * Wrap the string with the correct regex
	 * syntax.
	 */
	
	function wrap(arr, sep, opts) {
	  if (sep === '~') { sep = '-'; }
	  var str = arr.join(sep);
	  var pre = opts && opts.regexPrefix;
	
	  // regex logical `or`
	  if (sep === '|') {
	    str = pre ? pre + str : str;
	    str = '(' + str + ')';
	  }
	
	  // regex character class
	  if (sep === '-') {
	    str = (pre && pre === '^')
	      ? pre + str
	      : str;
	    str = '[' + str + ']';
	  }
	  return [str];
	}
	
	/**
	 * Check for invalid characters
	 */
	
	function isCharClass(a, b, step, isNum, isDescending) {
	  if (isDescending) { return false; }
	  if (isNum) { return a <= 9 && b <= 9; }
	  if (a < b) { return step === 1; }
	  return false;
	}
	
	/**
	 * Detect the correct separator to use
	 */
	
	function shouldExpand(a, b, num, isNum, padding, opts) {
	  if (isNum && (a > 9 || b > 9)) { return false; }
	  return !padding && num === 1 && a < b;
	}
	
	/**
	 * Detect the correct separator to use
	 */
	
	function detectSeparator(a, b, step, isNum, isDescending) {
	  var isChar = isCharClass(a, b, step, isNum, isDescending);
	  if (!isChar) {
	    return '|';
	  }
	  return '~';
	}
	
	/**
	 * Correctly format the step based on type
	 */
	
	function formatStep(step) {
	  return Math.abs(step >> 0) || 1;
	}
	
	/**
	 * Format padding, taking leading `-` into account
	 */
	
	function formatPadding(ch, pad) {
	  var res = pad ? pad + ch : ch;
	  if (pad && ch.toString().charAt(0) === '-') {
	    res = '-' + pad + ch.toString().substr(1);
	  }
	  return res.toString();
	}
	
	/**
	 * Check for invalid characters
	 */
	
	function isInvalidChar(str) {
	  var ch = toStr(str);
	  return ch === '\\'
	    || ch === '['
	    || ch === ']'
	    || ch === '^'
	    || ch === '('
	    || ch === ')'
	    || ch === '`';
	}
	
	/**
	 * Convert to a string from a charCode
	 */
	
	function toStr(ch) {
	  return String.fromCharCode(ch);
	}
	
	
	/**
	 * Step regex
	 */
	
	function stepRe() {
	  return /\?|>|\||\+|\~/g;
	}
	
	/**
	 * Return true if `val` has either a letter
	 * or a number
	 */
	
	function noAlphaNum(val) {
	  return /[a-z0-9]/i.test(val);
	}
	
	/**
	 * Return true if `val` has both a letter and
	 * a number (invalid)
	 */
	
	function hasBoth(val) {
	  return /[a-z][0-9]|[0-9][a-z]/i.test(val);
	}
	
	/**
	 * Normalize zeros for checks
	 */
	
	function zeros(val) {
	  if (/^-*0+$/.test(val.toString())) {
	    return '0';
	  }
	  return val;
	}
	
	/**
	 * Return true if `val` has leading zeros,
	 * or a similar valid pattern.
	 */
	
	function hasZeros(val) {
	  return /[^.]\.|^-*0+[0-9]/.test(val);
	}
	
	/**
	 * If the string is padded, returns a curried function with
	 * the a cached padding string, or `false` if no padding.
	 *
	 * @param  {*} `origA` String or number.
	 * @return {String|Boolean}
	 */
	
	function isPadded(origA, origB) {
	  if (hasZeros(origA) || hasZeros(origB)) {
	    var alen = length(origA);
	    var blen = length(origB);
	
	    var len = alen >= blen
	      ? alen
	      : blen;
	
	    return function (a) {
	      return repeatStr('0', len - length(a));
	    };
	  }
	  return false;
	}
	
	/**
	 * Get the string length of `val`
	 */
	
	function length(val) {
	  return val.toString().length;
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isArray = __webpack_require__(11);
	
	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object' && isArray(val) === false;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-number <https://github.com/jonschlinkert/is-number>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var typeOf = __webpack_require__(14);
	
	module.exports = function isNumber(num) {
	  var type = typeOf(num);
	  if (type !== 'number' && type !== 'string') {
	    return false;
	  }
	  var n = +num;
	  return (n - n + 1) >= 0 && num !== '';
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * randomatic <https://github.com/jonschlinkert/randomatic>
	 *
	 * This was originally inspired by <http://stackoverflow.com/a/10727155/1267639>
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License (MIT)
	 */
	
	'use strict';
	
	var isNumber = __webpack_require__(28);
	var typeOf = __webpack_require__(14);
	
	/**
	 * Expose `randomatic`
	 */
	
	module.exports = randomatic;
	
	/**
	 * Available mask characters
	 */
	
	var type = {
	  lower: 'abcdefghijklmnopqrstuvwxyz',
	  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	  number: '0123456789',
	  special: '~!@#$%^&()_+-={}[];\',.'
	};
	
	type.all = type.lower + type.upper + type.number;
	
	/**
	 * Generate random character sequences of a specified `length`,
	 * based on the given `pattern`.
	 *
	 * @param {String} `pattern` The pattern to use for generating the random string.
	 * @param {String} `length` The length of the string to generate.
	 * @param {String} `options`
	 * @return {String}
	 * @api public
	 */
	
	function randomatic(pattern, length, options) {
	  if (typeof pattern === 'undefined') {
	    throw new Error('randomatic expects a string or number.');
	  }
	
	  var custom = false;
	  if (arguments.length === 1) {
	    if (typeof pattern === 'string') {
	      length = pattern.length;
	
	    } else if (isNumber(pattern)) {
	      options = {}; length = pattern; pattern = '*';
	    }
	  }
	
	  if (typeOf(length) === 'object' && length.hasOwnProperty('chars')) {
	    options = length;
	    pattern = options.chars;
	    length = pattern.length;
	    custom = true;
	  }
	
	  var opts = options || {};
	  var mask = '';
	  var res = '';
	
	  // Characters to be used
	  if (pattern.indexOf('?') !== -1) mask += opts.chars;
	  if (pattern.indexOf('a') !== -1) mask += type.lower;
	  if (pattern.indexOf('A') !== -1) mask += type.upper;
	  if (pattern.indexOf('0') !== -1) mask += type.number;
	  if (pattern.indexOf('!') !== -1) mask += type.special;
	  if (pattern.indexOf('*') !== -1) mask += type.all;
	  if (custom) mask += pattern;
	
	  while (length--) {
	    res += mask.charAt(parseInt(Math.random() * mask.length, 10));
	  }
	  return res;
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	/*!
	 * repeat-string <https://github.com/jonschlinkert/repeat-string>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	/**
	 * Results cache
	 */
	
	var res = '';
	var cache;
	
	/**
	 * Expose `repeat`
	 */
	
	module.exports = repeat;
	
	/**
	 * Repeat the given `string` the specified `number`
	 * of times.
	 *
	 * **Example:**
	 *
	 * ```js
	 * var repeat = require('repeat-string');
	 * repeat('A', 5);
	 * //=> AAAAA
	 * ```
	 *
	 * @param {String} `string` The string to repeat
	 * @param {Number} `number` The number of times to repeat the string
	 * @return {String} Repeated string
	 * @api public
	 */
	
	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }
	
	  // cover common, quick use cases
	  if (num === 1) return str;
	  if (num === 2) return str + str;
	
	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  } else if (res.length >= max) {
	    return res.substr(0, max);
	  }
	
	  while (max > res.length && num > 1) {
	    if (num & 1) {
	      res += str;
	    }
	
	    num >>= 1;
	    str += str;
	  }
	
	  res += str;
	  res = res.substr(0, max);
	  return res;
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	/*!
	 * repeat-element <https://github.com/jonschlinkert/repeat-element>
	 *
	 * Copyright (c) 2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	module.exports = function repeat(ele, num) {
	  var arr = new Array(num);
	
	  for (var i = 0; i < num; i++) {
	    arr[i] = ele;
	  }
	
	  return arr;
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	/*!
	 * preserve <https://github.com/jonschlinkert/preserve>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	/**
	 * Replace tokens in `str` with a temporary, heuristic placeholder.
	 *
	 * ```js
	 * tokens.before('{a\\,b}');
	 * //=> '{__ID1__}'
	 * ```
	 *
	 * @param  {String} `str`
	 * @return {String} String with placeholders.
	 * @api public
	 */
	
	exports.before = function before(str, re) {
	  return str.replace(re, function (match) {
	    var id = randomize();
	    cache[id] = match;
	    return '__ID' + id + '__';
	  });
	};
	
	/**
	 * Replace placeholders in `str` with original tokens.
	 *
	 * ```js
	 * tokens.after('{__ID1__}');
	 * //=> '{a\\,b}'
	 * ```
	 *
	 * @param  {String} `str` String with placeholders
	 * @return {String} `str` String with original tokens.
	 * @api public
	 */
	
	exports.after = function after(str) {
	  return str.replace(/__ID(.{5})__/g, function (_, id) {
	    return cache[id];
	  });
	};
	
	function randomize() {
	  return Math.random().toString().slice(2, 7);
	}
	
	var cache = {};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * expand-brackets <https://github.com/jonschlinkert/expand-brackets>
	 *
	 * Copyright (c) 2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	var isPosixBracket = __webpack_require__(34);
	
	/**
	 * POSIX character classes
	 */
	
	var POSIX = {
	  alnum: 'a-zA-Z0-9',
	  alpha: 'a-zA-Z',
	  blank: ' \\t',
	  cntrl: '\\x00-\\x1F\\x7F',
	  digit: '0-9',
	  graph: '\\x21-\\x7E',
	  lower: 'a-z',
	  print: '\\x20-\\x7E',
	  punct: '-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
	  space: ' \\t\\r\\n\\v\\f',
	  upper: 'A-Z',
	  word:  'A-Za-z0-9_',
	  xdigit: 'A-Fa-f0-9',
	};
	
	/**
	 * Expose `brackets`
	 */
	
	module.exports = brackets;
	
	function brackets(str) {
	  if (!isPosixBracket(str)) {
	    return str;
	  }
	
	  var negated = false;
	  if (str.indexOf('[^') !== -1) {
	    negated = true;
	    str = str.split('[^').join('[');
	  }
	  if (str.indexOf('[!') !== -1) {
	    negated = true;
	    str = str.split('[!').join('[');
	  }
	
	  var a = str.split('[');
	  var b = str.split(']');
	  var imbalanced = a.length !== b.length;
	
	  var parts = str.split(/(?::\]\[:|\[?\[:|:\]\]?)/);
	  var len = parts.length, i = 0;
	  var end = '', beg = '';
	  var res = [];
	
	  // start at the end (innermost) first
	  while (len--) {
	    var inner = parts[i++];
	    if (inner === '^[!' || inner === '[!') {
	      inner = '';
	      negated = true;
	    }
	
	    var prefix = negated ? '^' : '';
	    var ch = POSIX[inner];
	
	    if (ch) {
	      res.push('[' + prefix + ch + ']');
	    } else if (inner) {
	      if (/^\[?\w-\w\]?$/.test(inner)) {
	        if (i === parts.length) {
	          res.push('[' + prefix + inner);
	        } else if (i === 1) {
	          res.push(prefix + inner + ']');
	        } else {
	          res.push(prefix + inner);
	        }
	      } else {
	        if (i === 1) {
	          beg += inner;
	        } else if (i === parts.length) {
	          end += inner;
	        } else {
	          res.push('[' + prefix + inner + ']');
	        }
	      }
	    }
	  }
	
	  var result = res.join('|');
	  var rlen = res.length || 1;
	  if (rlen > 1) {
	    result = '(?:' + result + ')';
	    rlen = 1;
	  }
	  if (beg) {
	    rlen++;
	    if (beg.charAt(0) === '[') {
	      if (imbalanced) {
	        beg = '\\[' + beg.slice(1);
	      } else {
	        beg += ']';
	      }
	    }
	    result = beg + result;
	  }
	  if (end) {
	    rlen++;
	    if (end.slice(-1) === ']') {
	      if (imbalanced) {
	        end = end.slice(0, end.length - 1) + '\\]';
	      } else {
	        end = '[' + end;
	      }
	    }
	    result += end;
	  }
	
	  if (rlen > 1) {
	    result = result.split('][').join(']|[');
	    if (result.indexOf('|') !== -1 && !/\(\?/.test(result)) {
	      result = '(?:' + result + ')';
	    }
	  }
	
	  result = result.replace(/\[+=|=\]+/g, '\\b');
	  return result;
	}
	
	brackets.makeRe = function(pattern) {
	  try {
	    return new RegExp(brackets(pattern));
	  } catch (err) {}
	};
	
	brackets.isMatch = function(str, pattern) {
	  try {
	    return brackets.makeRe(pattern).test(str);
	  } catch (err) {
	    return false;
	  }
	};
	
	brackets.match = function(arr, pattern) {
	  var len = arr.length, i = 0;
	  var res = arr.slice();
	
	  var re = brackets.makeRe(pattern);
	  while (i < len) {
	    var ele = arr[i++];
	    if (!re.test(ele)) {
	      continue;
	    }
	    res.splice(i, 1);
	  }
	  return res;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	/*!
	 * is-posix-bracket <https://github.com/jonschlinkert/is-posix-bracket>
	 *
	 * Copyright (c) 2015-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	module.exports = function isPosixBracket(str) {
	  return typeof str === 'string' && /\[([:.=+])(?:[^\[\]]|)+\1\]/.test(str);
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * extglob <https://github.com/jonschlinkert/extglob>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	/**
	 * Module dependencies
	 */
	
	var isExtglob = __webpack_require__(36);
	var re, cache = {};
	
	/**
	 * Expose `extglob`
	 */
	
	module.exports = extglob;
	
	/**
	 * Convert the given extglob `string` to a regex-compatible
	 * string.
	 *
	 * ```js
	 * var extglob = require('extglob');
	 * extglob('!(a?(b))');
	 * //=> '(?!a(?:b)?)[^/]*?'
	 * ```
	 *
	 * @param {String} `str` The string to convert.
	 * @param {Object} `options`
	 *   @option {Boolean} [options] `esc` If `false` special characters will not be escaped. Defaults to `true`.
	 *   @option {Boolean} [options] `regex` If `true` a regular expression is returned instead of a string.
	 * @return {String}
	 * @api public
	 */
	
	
	function extglob(str, opts) {
	  opts = opts || {};
	  var o = {}, i = 0;
	
	  // fix common character reversals
	  // '*!(.js)' => '*.!(js)'
	  str = str.replace(/!\(([^\w*()])/g, '$1!(');
	
	  // support file extension negation
	  str = str.replace(/([*\/])\.!\([*]\)/g, function (m, ch) {
	    if (ch === '/') {
	      return escape('\\/[^.]+');
	    }
	    return escape('[^.]+');
	  });
	
	  // create a unique key for caching by
	  // combining the string and options
	  var key = str
	    + String(!!opts.regex)
	    + String(!!opts.contains)
	    + String(!!opts.escape);
	
	  if (cache.hasOwnProperty(key)) {
	    return cache[key];
	  }
	
	  if (!(re instanceof RegExp)) {
	    re = regex();
	  }
	
	  opts.negate = false;
	  var m;
	
	  while (m = re.exec(str)) {
	    var prefix = m[1];
	    var inner = m[3];
	    if (prefix === '!') {
	      opts.negate = true;
	    }
	
	    var id = '__EXTGLOB_' + (i++) + '__';
	    // use the prefix of the _last_ (outtermost) pattern
	    o[id] = wrap(inner, prefix, opts.escape);
	    str = str.split(m[0]).join(id);
	  }
	
	  var keys = Object.keys(o);
	  var len = keys.length;
	
	  // we have to loop again to allow us to convert
	  // patterns in reverse order (starting with the
	  // innermost/last pattern first)
	  while (len--) {
	    var prop = keys[len];
	    str = str.split(prop).join(o[prop]);
	  }
	
	  var result = opts.regex
	    ? toRegex(str, opts.contains, opts.negate)
	    : str;
	
	  result = result.split('.').join('\\.');
	
	  // cache the result and return it
	  return (cache[key] = result);
	}
	
	/**
	 * Convert `string` to a regex string.
	 *
	 * @param  {String} `str`
	 * @param  {String} `prefix` Character that determines how to wrap the string.
	 * @param  {Boolean} `esc` If `false` special characters will not be escaped. Defaults to `true`.
	 * @return {String}
	 */
	
	function wrap(inner, prefix, esc) {
	  if (esc) inner = escape(inner);
	
	  switch (prefix) {
	    case '!':
	      return '(?!' + inner + ')[^/]' + (esc ? '%%%~' : '*?');
	    case '@':
	      return '(?:' + inner + ')';
	    case '+':
	      return '(?:' + inner + ')+';
	    case '*':
	      return '(?:' + inner + ')' + (esc ? '%%' : '*')
	    case '?':
	      return '(?:' + inner + '|)';
	    default:
	      return inner;
	  }
	}
	
	function escape(str) {
	  str = str.split('*').join('[^/]%%%~');
	  str = str.split('.').join('\\.');
	  return str;
	}
	
	/**
	 * extglob regex.
	 */
	
	function regex() {
	  return /(\\?[@?!+*$]\\?)(\(([^()]*?)\))/;
	}
	
	/**
	 * Negation regex
	 */
	
	function negate(str) {
	  return '(?!^' + str + ').*$';
	}
	
	/**
	 * Create the regex to do the matching. If
	 * the leading character in the `pattern` is `!`
	 * a negation regex is returned.
	 *
	 * @param {String} `pattern`
	 * @param {Boolean} `contains` Allow loose matching.
	 * @param {Boolean} `isNegated` True if the pattern is a negation pattern.
	 */
	
	function toRegex(pattern, contains, isNegated) {
	  var prefix = contains ? '^' : '';
	  var after = contains ? '$' : '';
	  pattern = ('(?:' + pattern + ')' + after);
	  if (isNegated) {
	    pattern = prefix + negate(pattern);
	  }
	  return new RegExp(prefix + pattern);
	}


/***/ },
/* 36 */
/***/ function(module, exports) {

	/*!
	 * is-extglob <https://github.com/jonschlinkert/is-extglob>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	module.exports = function isExtglob(str) {
	  return typeof str === 'string'
	    && /[@?!+*]\(/.test(str);
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-glob <https://github.com/jonschlinkert/is-glob>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	var isExtglob = __webpack_require__(36);
	
	module.exports = function isGlob(str) {
	  return typeof str === 'string'
	    && (/[*!?{}(|)[\]]/.test(str)
	     || isExtglob(str));
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	/*!
	 * normalize-path <https://github.com/jonschlinkert/normalize-path>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License
	 */
	
	module.exports = function normalizePath(str, stripTrailing) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }
	  str = str.replace(/[\\\/]+/g, '/');
	  if (stripTrailing !== false) {
	    str = str.replace(/\/$/, '');
	  }
	  return str;
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * object.omit <https://github.com/jonschlinkert/object.omit>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(40);
	var forOwn = __webpack_require__(41);
	
	module.exports = function omit(obj, keys) {
	  if (!isObject(obj)) return {};
	
	  keys = [].concat.apply([], [].slice.call(arguments, 1));
	  var last = keys[keys.length - 1];
	  var res = {}, fn;
	
	  if (typeof last === 'function') {
	    fn = keys.pop();
	  }
	
	  var isFunction = typeof fn === 'function';
	  if (!keys.length && !isFunction) {
	    return obj;
	  }
	
	  forOwn(obj, function(value, key) {
	    if (keys.indexOf(key) === -1) {
	
	      if (!isFunction) {
	        res[key] = value;
	      } else if (fn(value, key, obj)) {
	        res[key] = value;
	      }
	    }
	  });
	  return res;
	};


/***/ },
/* 40 */
/***/ function(module, exports) {

	/*!
	 * is-extendable <https://github.com/jonschlinkert/is-extendable>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function isExtendable(val) {
	  return typeof val !== 'undefined' && val !== null
	    && (typeof val === 'object' || typeof val === 'function');
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * for-own <https://github.com/jonschlinkert/for-own>
	 *
	 * Copyright (c) 2014-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var forIn = __webpack_require__(42);
	var hasOwn = Object.prototype.hasOwnProperty;
	
	module.exports = function forOwn(o, fn, thisArg) {
	  forIn(o, function(val, key) {
	    if (hasOwn.call(o, key)) {
	      return fn.call(thisArg, o[key], key, o);
	    }
	  });
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	/*!
	 * for-in <https://github.com/jonschlinkert/for-in>
	 *
	 * Copyright (c) 2014-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function forIn(o, fn, thisArg) {
	  for (var key in o) {
	    if (fn.call(thisArg, o[key], key, o) === false) {
	      break;
	    }
	  }
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * parse-glob <https://github.com/jonschlinkert/parse-glob>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isGlob = __webpack_require__(37);
	var findBase = __webpack_require__(44);
	var extglob = __webpack_require__(36);
	var dotfile = __webpack_require__(46);
	
	/**
	 * Expose `cache`
	 */
	
	var cache = module.exports.cache = {};
	
	/**
	 * Parse a glob pattern into tokens.
	 *
	 * When no paths or '**' are in the glob, we use a
	 * different strategy for parsing the filename, since
	 * file names can contain braces and other difficult
	 * patterns. such as:
	 *
	 *  - `*.{a,b}`
	 *  - `(**|*.js)`
	 */
	
	module.exports = function parseGlob(glob) {
	  if (cache.hasOwnProperty(glob)) {
	    return cache[glob];
	  }
	
	  var tok = {};
	  tok.orig = glob;
	  tok.is = {};
	
	  // unescape dots and slashes in braces/brackets
	  glob = escape(glob);
	
	  var parsed = findBase(glob);
	  tok.is.glob = parsed.isGlob;
	
	  tok.glob = parsed.glob;
	  tok.base = parsed.base;
	  var segs = /([^\/]*)$/.exec(glob);
	
	  tok.path = {};
	  tok.path.dirname = '';
	  tok.path.basename = segs[1] || '';
	  tok.path.dirname = glob.split(tok.path.basename).join('') || '';
	  var basename = (tok.path.basename || '').split('.') || '';
	  tok.path.filename = basename[0] || '';
	  tok.path.extname = basename.slice(1).join('.') || '';
	  tok.path.ext = '';
	
	  if (isGlob(tok.path.dirname) && !tok.path.basename) {
	    if (!/\/$/.test(tok.glob)) {
	      tok.path.basename = tok.glob;
	    }
	    tok.path.dirname = tok.base;
	  }
	
	  if (glob.indexOf('/') === -1 && !tok.is.globstar) {
	    tok.path.dirname = '';
	    tok.path.basename = tok.orig;
	  }
	
	  var dot = tok.path.basename.indexOf('.');
	  if (dot !== -1) {
	    tok.path.filename = tok.path.basename.slice(0, dot);
	    tok.path.extname = tok.path.basename.slice(dot);
	  }
	
	  if (tok.path.extname.charAt(0) === '.') {
	    var exts = tok.path.extname.split('.');
	    tok.path.ext = exts[exts.length - 1];
	  }
	
	  // unescape dots and slashes in braces/brackets
	  tok.glob = unescape(tok.glob);
	  tok.path.dirname = unescape(tok.path.dirname);
	  tok.path.basename = unescape(tok.path.basename);
	  tok.path.filename = unescape(tok.path.filename);
	  tok.path.extname = unescape(tok.path.extname);
	
	  // Booleans
	  var is = (glob && tok.is.glob);
	  tok.is.negated  = glob && glob.charAt(0) === '!';
	  tok.is.extglob  = glob && extglob(glob);
	  tok.is.braces   = has(is, glob, '{');
	  tok.is.brackets = has(is, glob, '[:');
	  tok.is.globstar = has(is, glob, '**');
	  tok.is.dotfile  = dotfile(tok.path.basename) || dotfile(tok.path.filename);
	  tok.is.dotdir   = dotdir(tok.path.dirname);
	  return (cache[glob] = tok);
	}
	
	/**
	 * Returns true if the glob matches dot-directories.
	 *
	 * @param  {Object} `tok` The tokens object
	 * @param  {Object} `path` The path object
	 * @return {Object}
	 */
	
	function dotdir(base) {
	  if (base.indexOf('/.') !== -1) {
	    return true;
	  }
	  if (base.charAt(0) === '.' && base.charAt(1) !== '/') {
	    return true;
	  }
	  return false;
	}
	
	/**
	 * Returns true if the pattern has the given `ch`aracter(s)
	 *
	 * @param  {Object} `glob` The glob pattern.
	 * @param  {Object} `ch` The character to test for
	 * @return {Object}
	 */
	
	function has(is, glob, ch) {
	  return is && glob.indexOf(ch) !== -1;
	}
	
	/**
	 * Escape/unescape utils
	 */
	
	function escape(str) {
	  var re = /\{([^{}]*?)}|\(([^()]*?)\)|\[([^\[\]]*?)\]/g;
	  return str.replace(re, function (outter, braces, parens, brackets) {
	    var inner = braces || parens || brackets;
	    if (!inner) { return outter; }
	    return outter.split(inner).join(esc(inner));
	  });
	}
	
	function esc(str) {
	  str = str.split('/').join('__SLASH__');
	  str = str.split('.').join('__DOT__');
	  return str;
	}
	
	function unescape(str) {
	  str = str.split('__SLASH__').join('/');
	  str = str.split('__DOT__').join('.');
	  return str;
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * glob-base <https://github.com/jonschlinkert/glob-base>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var path = __webpack_require__(20);
	var parent = __webpack_require__(45);
	var isGlob = __webpack_require__(37);
	
	module.exports = function globBase(pattern) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob-base expects a string.');
	  }
	
	  var res = {};
	  res.base = parent(pattern);
	  res.isGlob = isGlob(pattern);
	
	  if (res.base !== '.') {
	    res.glob = pattern.substr(res.base.length);
	    if (res.glob.charAt(0) === '/') {
	      res.glob = res.glob.substr(1);
	    }
	  } else {
	    res.glob = pattern;
	  }
	
	  if (!res.isGlob) {
	    res.base = dirname(pattern);
	    res.glob = res.base !== '.'
	      ? pattern.substr(res.base.length)
	      : pattern;
	  }
	
	  if (res.glob.substr(0, 2) === './') {
	    res.glob = res.glob.substr(2);
	  }
	  if (res.glob.charAt(0) === '/') {
	    res.glob = res.glob.substr(1);
	  }
	  return res;
	};
	
	function dirname(glob) {
	  if (glob.slice(-1) === '/') return glob;
	  return path.dirname(glob);
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var path = __webpack_require__(20);
	var isglob = __webpack_require__(37);
	
	module.exports = function globParent(str) {
		str += 'a'; // preserves full path in case of trailing path separator
		do {str = path.dirname(str)} while (isglob(str));
		return str;
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	/*!
	 * is-dotfile <https://github.com/regexps/is-dotfile>
	 *
	 * Copyright (c) 2015 Jon Schlinkert, contributors.
	 * Licensed under the MIT license.
	 */
	
	module.exports = function(str) {
	  if (str.charCodeAt(0) === 46 /* . */ && str.indexOf('/', 1) === -1) {
	    return true;
	  }
	
	  var last = str.lastIndexOf('/');
	  return last !== -1 ? str.charCodeAt(last + 1) === 46  /* . */ : false;
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * regex-cache <https://github.com/jonschlinkert/regex-cache>
	 *
	 * Copyright (c) 2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	var isPrimitive = __webpack_require__(48);
	var equal = __webpack_require__(49);
	var basic = {};
	var cache = {};
	
	/**
	 * Expose `regexCache`
	 */
	
	module.exports = regexCache;
	
	/**
	 * Memoize the results of a call to the new RegExp constructor.
	 *
	 * @param  {Function} fn [description]
	 * @param  {String} str [description]
	 * @param  {Options} options [description]
	 * @param  {Boolean} nocompare [description]
	 * @return {RegExp}
	 */
	
	function regexCache(fn, str, opts) {
	  var key = '_default_', regex, cached;
	
	  if (!str && !opts) {
	    if (typeof fn !== 'function') {
	      return fn;
	    }
	    return basic[key] || (basic[key] = fn(str));
	  }
	
	  var isString = typeof str === 'string';
	  if (isString) {
	    if (!opts) {
	      return basic[str] || (basic[str] = fn(str));
	    }
	    key = str;
	  } else {
	    opts = str;
	  }
	
	  cached = cache[key];
	  if (cached && equal(cached.opts, opts)) {
	    return cached.regex;
	  }
	
	  memo(key, opts, (regex = fn(str, opts)));
	  return regex;
	}
	
	function memo(key, opts, regex) {
	  cache[key] = {regex: regex, opts: opts};
	}
	
	/**
	 * Expose `cache`
	 */
	
	module.exports.cache = cache;
	module.exports.basic = basic;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/*!
	 * is-primitive <https://github.com/jonschlinkert/is-primitive>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	// see http://jsperf.com/testing-value-is-primitive/7
	module.exports = function isPrimitive(value) {
	  return value == null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-equal-shallow <https://github.com/jonschlinkert/is-equal-shallow>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isPrimitive = __webpack_require__(48);
	
	module.exports = function isEqual(a, b) {
	  if (!a && !b) { return true; }
	  if (!a && b || a && !b) { return false; }
	
	  var numKeysA = 0, numKeysB = 0, key;
	  for (key in b) {
	    numKeysB++;
	    if (!isPrimitive(b[key]) || !a.hasOwnProperty(key) || (a[key] !== b[key])) {
	      return false;
	    }
	  }
	  for (key in a) {
	    numKeysA++;
	  }
	  return numKeysA === numKeysB;
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var chars = __webpack_require__(51);
	var utils = __webpack_require__(18);
	
	/**
	 * Expose `Glob`
	 */
	
	var Glob = module.exports = function Glob(pattern, options) {
	  if (!(this instanceof Glob)) {
	    return new Glob(pattern, options);
	  }
	  this.options = options || {};
	  this.pattern = pattern;
	  this.history = [];
	  this.tokens = {};
	  this.init(pattern);
	};
	
	/**
	 * Initialize defaults
	 */
	
	Glob.prototype.init = function(pattern) {
	  this.orig = pattern;
	  this.negated = this.isNegated();
	  this.options.track = this.options.track || false;
	  this.options.makeRe = true;
	};
	
	/**
	 * Push a change into `glob.history`. Useful
	 * for debugging.
	 */
	
	Glob.prototype.track = function(msg) {
	  if (this.options.track) {
	    this.history.push({msg: msg, pattern: this.pattern});
	  }
	};
	
	/**
	 * Return true if `glob.pattern` was negated
	 * with `!`, also remove the `!` from the pattern.
	 *
	 * @return {Boolean}
	 */
	
	Glob.prototype.isNegated = function() {
	  if (this.pattern.charCodeAt(0) === 33 /* '!' */) {
	    this.pattern = this.pattern.slice(1);
	    return true;
	  }
	  return false;
	};
	
	/**
	 * Expand braces in the given glob pattern.
	 *
	 * We only need to use the [braces] lib when
	 * patterns are nested.
	 */
	
	Glob.prototype.braces = function() {
	  if (this.options.nobraces !== true && this.options.nobrace !== true) {
	    // naive/fast check for imbalanced characters
	    var a = this.pattern.match(/[\{\(\[]/g);
	    var b = this.pattern.match(/[\}\)\]]/g);
	
	    // if imbalanced, don't optimize the pattern
	    if (a && b && (a.length !== b.length)) {
	      this.options.makeRe = false;
	    }
	
	    // expand brace patterns and join the resulting array
	    var expanded = utils.braces(this.pattern, this.options);
	    this.pattern = expanded.join('|');
	  }
	};
	
	/**
	 * Expand bracket expressions in `glob.pattern`
	 */
	
	Glob.prototype.brackets = function() {
	  if (this.options.nobrackets !== true) {
	    this.pattern = utils.brackets(this.pattern);
	  }
	};
	
	/**
	 * Expand bracket expressions in `glob.pattern`
	 */
	
	Glob.prototype.extglob = function() {
	  if (this.options.noextglob === true) return;
	
	  if (utils.isExtglob(this.pattern)) {
	    this.pattern = utils.extglob(this.pattern, {escape: true});
	  }
	};
	
	/**
	 * Parse the given pattern
	 */
	
	Glob.prototype.parse = function(pattern) {
	  this.tokens = utils.parseGlob(pattern || this.pattern, true);
	  return this.tokens;
	};
	
	/**
	 * Replace `a` with `b`. Also tracks the change before and
	 * after each replacement. This is disabled by default, but
	 * can be enabled by setting `options.track` to true.
	 *
	 * Also, when the pattern is a string, `.split()` is used,
	 * because it's much faster than replace.
	 *
	 * @param  {RegExp|String} `a`
	 * @param  {String} `b`
	 * @param  {Boolean} `escape` When `true`, escapes `*` and `?` in the replacement.
	 * @return {String}
	 */
	
	Glob.prototype._replace = function(a, b, escape) {
	  this.track('before (find): "' + a + '" (replace with): "' + b + '"');
	  if (escape) b = esc(b);
	  if (a && b && typeof a === 'string') {
	    this.pattern = this.pattern.split(a).join(b);
	  } else {
	    this.pattern = this.pattern.replace(a, b);
	  }
	  this.track('after');
	};
	
	/**
	 * Escape special characters in the given string.
	 *
	 * @param  {String} `str` Glob pattern
	 * @return {String}
	 */
	
	Glob.prototype.escape = function(str) {
	  this.track('before escape: ');
	  var re = /["\\](['"]?[^"'\\]['"]?)/g;
	
	  this.pattern = str.replace(re, function($0, $1) {
	    var o = chars.ESC;
	    var ch = o && o[$1];
	    if (ch) {
	      return ch;
	    }
	    if (/[a-z]/i.test($0)) {
	      return $0.split('\\').join('');
	    }
	    return $0;
	  });
	
	  this.track('after escape: ');
	};
	
	/**
	 * Unescape special characters in the given string.
	 *
	 * @param  {String} `str`
	 * @return {String}
	 */
	
	Glob.prototype.unescape = function(str) {
	  var re = /__([A-Z]+)_([A-Z]+)__/g;
	  this.pattern = str.replace(re, function($0, $1) {
	    return chars[$1][$0];
	  });
	  this.pattern = unesc(this.pattern);
	};
	
	/**
	 * Escape/unescape utils
	 */
	
	function esc(str) {
	  str = str.split('?').join('%~');
	  str = str.split('*').join('%%');
	  return str;
	}
	
	function unesc(str) {
	  str = str.split('%~').join('?');
	  str = str.split('%%').join('*');
	  return str;
	}


/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	var chars = {}, unesc, temp;
	
	function reverse(object, prepender) {
	  return Object.keys(object).reduce(function(reversed, key) {
	    var newKey = prepender ? prepender + key : key; // Optionally prepend a string to key.
	    reversed[object[key]] = newKey; // Swap key and value.
	    return reversed; // Return the result.
	  }, {});
	}
	
	/**
	 * Regex for common characters
	 */
	
	chars.escapeRegex = {
	  '?': /\?/g,
	  '@': /\@/g,
	  '!': /\!/g,
	  '+': /\+/g,
	  '*': /\*/g,
	  '(': /\(/g,
	  ')': /\)/g,
	  '[': /\[/g,
	  ']': /\]/g
	};
	
	/**
	 * Escape characters
	 */
	
	chars.ESC = {
	  '?': '__UNESC_QMRK__',
	  '@': '__UNESC_AMPE__',
	  '!': '__UNESC_EXCL__',
	  '+': '__UNESC_PLUS__',
	  '*': '__UNESC_STAR__',
	  ',': '__UNESC_COMMA__',
	  '(': '__UNESC_LTPAREN__',
	  ')': '__UNESC_RTPAREN__',
	  '[': '__UNESC_LTBRACK__',
	  ']': '__UNESC_RTBRACK__'
	};
	
	/**
	 * Unescape characters
	 */
	
	chars.UNESC = unesc || (unesc = reverse(chars.ESC, '\\'));
	
	chars.ESC_TEMP = {
	  '?': '__TEMP_QMRK__',
	  '@': '__TEMP_AMPE__',
	  '!': '__TEMP_EXCL__',
	  '*': '__TEMP_STAR__',
	  '+': '__TEMP_PLUS__',
	  ',': '__TEMP_COMMA__',
	  '(': '__TEMP_LTPAREN__',
	  ')': '__TEMP_RTPAREN__',
	  '[': '__TEMP_LTBRACK__',
	  ']': '__TEMP_RTBRACK__'
	};
	
	chars.TEMP = temp || (temp = reverse(chars.ESC_TEMP));
	
	module.exports = chars;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * array-every <https://github.com/jonschlinkert/array-every>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	var iterator = __webpack_require__(53);
	
	module.exports = function every(arr, cb, thisArg) {
	  cb = iterator(cb, thisArg);
	  var res = true;
	
	  if (arr == null) return res;
	  var len = arr.length;
	  var i = 0;
	
	  while (len--) {
	    if (!cb(arr[i++], i, arr)) {
	      res = false;
	      break;
	    }
	  }
	
	  return res;
	};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * make-iterator <https://github.com/jonschlinkert/make-iterator>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Copyright (c) 2012, 2013 moutjs team and contributors (http://moutjs.com)
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var forOwn = __webpack_require__(41);
	
	/**
	 * Convert an argument into a valid iterator.
	 * Used internally on most array/object/collection methods that receives a
	 * callback/iterator providing a shortcut syntax.
	 */
	
	module.exports = function makeIterator(src, thisArg) {
	  if (src == null) {
	    return noop;
	  }
	
	  switch (typeof src) {
	    // function is the first to improve perf (most common case)
	    // also avoid using `Function#call` if not needed, which boosts
	    // perf a lot in some cases
	    case 'function':
	      return (typeof thisArg !== 'undefined') ? function (val, i, arr) {
	        return src.call(thisArg, val, i, arr);
	      } : src;
	    case 'object':
	      return function (val) {
	        return deepMatches(val, src);
	      };
	    case 'string':
	    case 'number':
	      return prop(src);
	    }
	};
	
	function containsMatch(array, value) {
	  var len = array.length;
	  var i = -1;
	
	  while (++i < len) {
	    if (deepMatches(array[i], value)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	function matchArray(o, value) {
	  var len = value.length;
	  var i = -1;
	
	  while (++i < len) {
	    if (!containsMatch(o, value[i])) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function matchObject(o, value) {
	  var res = true;
	  forOwn(value, function (val, key) {
	    if (!deepMatches(o[key], val)) {
	      // Return false to break out of forOwn early
	      return (res = false);
	    }
	  });
	  return res;
	}
	
	/**
	 * Recursively compare objects
	 */
	
	function deepMatches(o, value) {
	  if (o && typeof o === 'object') {
	    if (Array.isArray(o) && Array.isArray(value)) {
	      return matchArray(o, value);
	    } else {
	      return matchObject(o, value);
	    }
	  } else {
	    return o === value;
	  }
	}
	
	function prop(name) {
	  return function(obj) {
	    return obj[name];
	  };
	}
	
	function noop(val) {
	  return val;
	}

/***/ },
/* 54 */
/***/ function(module, exports) {

	/*!
	 * array-slice <https://github.com/jonschlinkert/array-slice>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function slice(arr, start, end) {
	  var len = arr.length >>> 0;
	  var range = [];
	
	  start = idx(arr, start);
	  end = idx(arr, end, len);
	
	  while (start < end) {
	    range.push(arr[start++]);
	  }
	  return range;
	};
	
	
	function idx(arr, pos, end) {
	  var len = arr.length >>> 0;
	
	  if (pos == null) {
	    pos = end || 0;
	  } else if (pos < 0) {
	    pos = Math.max(len + pos, 0);
	  } else {
	    pos = Math.min(pos, len);
	  }
	
	  return pos;
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	/*!
	 * index-of <https://github.com/jonschlinkert/index-of>
	 *
	 * Copyright (c) 2014-2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	module.exports = function indexOf(arr, ele, start) {
	  start = start || 0;
	  var idx = -1;
	
	  if (arr == null) return idx;
	  var len = arr.length;
	  var i = start < 0
	    ? (len + start)
	    : start;
	
	  while (len--) {
	    if (arr[i++] === ele) {
	      idx = i - 1;
	      break;
	    }
	  }
	
	  return idx;
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=solver.js.map