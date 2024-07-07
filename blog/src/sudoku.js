export class Sudoku {
    constructor() {
        this.generateEmptyGrid()
        this.generateCounters()
    }

    generateEmptyGrid() {
        this.emptyCells = 81
        this.grid = []
        for (let i = 0; i < 9; i++)
            this.grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }

    generateCounters() {
        this.rows = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.columns = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.squares = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    isImmediatelyPossible(x, y, value) {
        if (this.grid[x][y]) return false
        if (this.isNthBit(this.rows[y], value)) return false
        if (this.isNthBit(this.columns[x], value)) return false
        const squareIndex = this.getSquareIndex(x, y)
        if (this.isNthBit(this.squares[squareIndex], value)) return false
    }

    findImmediatelyPossibleValues(x, y) {
        const squareIndex = this.getSquareIndex(x, y)
        return ~(this.rows[y] | this.columns[x] | this.squares[squareIndex])
    }

    getSquareIndex(x, y) {
        return Math.floor(x / 3) + Math.floor(y / 3) * 3
    }

    move(x, y, value) {
        const squareIndex = this.getSquareIndex(x, y)

        if (this.grid[x][y] !== 0 && value === 0)
            this.undoMove(x, y, this.grid[x][y])

        else if (this.grid[x][y] === 0 && value !== 0) {
            this.emptyCells--
            this.rows[y] = this.setNthBit(this.rows[y], value)
            this.columns[x] = this.setNthBit(this.columns[x], value)
            this.squares[squareIndex] = this.setNthBit(this.squares[squareIndex], value)
        }

        this.grid[x][y] = value
    }

    undoMove(x, y, value) {
        const squareIndex = this.getSquareIndex(x, y)

        this.emptyCells++
        this.rows[y] = this.resetNthBit(this.rows[y], value)
        this.columns[x] = this.resetNthBit(this.columns[x], value)
        this.squares[squareIndex] = this.resetNthBit(this.squares[squareIndex], value)
    }

    get(x, y) {
        return this.grid[x][y]
    }

    isNthBit(number, n) {
        return (number >> (n - 1)) & 1;
    }

    setNthBit(number, n) {
        const mask = 1 << (n - 1);
        return number | mask;
    }

    resetNthBit(number, n) {
        const mask = ~(1 << (n - 1));
        return number & mask;
    }

    isFull() {
        return this.emptyCells === 0
    }
}