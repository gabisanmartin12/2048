import React, { useState, useEffect } from 'react'
import { getRandomInt, getQuotientFrom, getRemainderFrom } from './utils/utils'
import './assets/board.css'
import { Direction } from './utils/direction'
import { Matrix } from './utils/matrix'

const Board = () => {
	const [pack, setPack] = useState(new Matrix(4, 4))

	useEffect(() => {
		const keyDownHandler = ({ keyCode }) => {
			if (Direction.isDirection(keyCode))
				updatePack(Direction.getDirectionFor(keyCode))
		}

		window.addEventListener('keydown', keyDownHandler)
		return () => window.removeEventListener('keydown', keyDownHandler)
	}, [])

	const updatePack = direction => {
		switch (direction) {
			case 'UP': upChecking(); break;
			case 'DOWN': downChecking(); break;
			case 'LEFT': leftChecking(); break;
			case 'RIGHT': rightChecking(); break;
			default: break;
		}
	}

	const upChecking = () => {
		let packClone = pack.clone()
		packClone.reduceColumns()
		setPack(packClone)
	}

	const downChecking = () => {}
	const leftChecking = () => {}
	const rightChecking = () => {}

	const addNumber = () => {
		let { row, col } = getPostionForNewNumber()
		if (isNaN(row) || isNaN(col))
			throw new Error("Game over my friend")

		let packClone = pack.clone()
		packClone.setCellValue(row, col, 2)
		setPack(packClone)
	}
	
	/**
	 * Getting an one-dimensional array with the indexes of 0-cells
	 * @return {array}
	 */
	const getIndexesOfEmptyCells = () => 
		pack.flat()
			.map((num, idx) => (num === 0) ? idx : -1)
			.filter(idx => idx !== -1)
	
	/**
	 * Getting the position for the number to be added
	 */
	const getPostionForNewNumber = () => {
		let options = getIndexesOfEmptyCells(),
			targetPosition = options[getRandomInt(options.length)]

		return {
			row: getQuotientFrom(targetPosition, 4),
			col: getRemainderFrom(targetPosition, 4)
		}
	}
		
	return (
		<div>
			<div className="board">
			{
				pack.flat().map((num, idx) => <div key={idx}>{num === null ? 0 : num}</div>)
			}
			</div>
			<button onClick={() => addNumber()}> Add number </button>
		</div>
	);
}

export default Board;
