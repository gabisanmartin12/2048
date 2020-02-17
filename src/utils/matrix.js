/**
 * Class to handle the main board game
 */
export class Matrix {
	constructor(rows, cols, value = 0) {
		this.rowCount = rows
		this.colCount = cols
		this.matrix = this.createMatrix(value)
	}

	createMatrix(value) {
		let matrix = []
		for (let rowidx = 0; rowidx < this.rowCount; rowidx++) {
			let row = []
			for (let colidx = 0; colidx < this.colCount; colidx++)
				row.push(value)
			matrix.push(row)
		}
		return matrix
	}

	getColumn(col) {
		if (this.colCount <= col)
			throw new Error('Column out of matrix')
		return this.matrix.map(row => row[col])
	}

	getColumns() {
		let columns = []
		for (let idx = 0; idx < this.colCount; idx++)
			columns.push(this.matrix.map(row => row[idx]))
		return columns
	}

	setColumn(col, values) {
		while (values.length !== this.colCount)
			values.push(0)

		this.matrix = this.matrix.map((row, idx) => {
			row[col] = values[idx]
			return row
		})
	}

	getRow(row) {
		if (this.rowCount <= row)
			throw new Error('Row out of matrix')
		return this.matrix[row]
	}

	setRow(row, values) {
		while(values.length !== this.rowCount)
			values.push(0)	
		this.matrix[row] = values
	}

	reduceColumns(mustReverse = false) {
		for (let idx = 0; idx < this.colCount; idx++)
			this.reduceColumn(idx, mustReverse)
	}

	reduceColumn(idx, mustReverse = false) {
		this.setColumn(idx, this.reduce(this.getColumn(idx), mustReverse))
	}

	reduceRows(mustReverse = false) {
		for (let idx = 0; idx < this.rowCount; idx++)
			this.reduceRow(idx, mustReverse)
	}

	reduceRow(idx, mustReverse) {
		this.setRow(idx, this.reduce(this.getRow(idx), mustReverse))
	}
	
	reduce(arr, mustReverse) {
		// Must I reverse the array?
		if (mustReverse) arr.reverse()
	
		// Filter zero values
		let nonZeroValues = arr.filter(val => val !== 0)
		if (!nonZeroValues.length) return []
		
		let newArray = []
		while (nonZeroValues.length > 1) {
			let current = parseInt(nonZeroValues.splice(0, 1))
			if (nonZeroValues[0] == current) {
				let next = parseInt(nonZeroValues.splice(0, 1))
				newArray.push(current + next)
			} else newArray.push(current)
		}
		
		// Is it an one-element array?
		if (nonZeroValues.length == 1) newArray.push(nonZeroValues.pop())
	
		// Fill the new column with zero values
		while (newArray.length !== this.colCount) newArray.push(0)
	
		// If the array was reversed, then we must to undo that operation
		if (mustReverse) newArray.reverse()

		return newArray
	}

	setCellValue(row, col, value) {
		if (this.rowCount <= row || this.colCount <= col)
			throw new Error('Index out of matrix')

		this.matrix[row][col] = value
	}

	flat() {
		return this.matrix.flat()
	}

	clone() {
		return Object.assign(
			Object.create(this),
			this
		)
	}
}