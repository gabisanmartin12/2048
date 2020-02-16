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
		let column = this.getColumn(idx)

		// Must I reverse the column?
		if (mustReverse) column.reverse()

		// Filter zero values
		let nonZeroValues = column.filter(val => val !== 0)
		if (!nonZeroValues.length) return
		
		let newColumn = []
		while (nonZeroValues.length) {
			let current = nonZeroValues.pop(), remainingSize = nonZeroValues.length
			if (!remainingSize || nonZeroValues[0] != current) {
				newColumn.push(current)
				return
			}

			if (remainingSize) {
				
			}
			
		}

		for (let colIdx = 0; colIdx < nonZeroValues.length-1; colIdx++) {
			let current = nonZeroValues[colIdx],
				next = nonZeroValues[colIdx + 1]

			if (current === next) {
				newColumn.push(current+next)
				colIdx += 1;
			} else {
				newColumn.push(current)
			}
		}

		while (newColumn.length !== this.colCount) {
			newColumn.push(0)
		}

		if (mustReverse) newColumn.reverse()
		
		this.setColumn(idx, newColumn)
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