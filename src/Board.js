import React, { useState } from 'react'
import { getRandomInt } from './utils/utils'
import './assets/board.css'

const Board = () => {
	const [pack, setPack] = useState([
		0, 0, 0, 0,
		0, 0, 0, 0,
		0, 2, 0, 4,
		0, 0, 8, 0
	])

	const addNumber = () => {
		let position = getPostionForNewNumber()
		if (isNaN(position))
			throw new Error("Game over my friend")

		let packClone = [...pack]
		packClone[position] = 2
		setPack(packClone)
	}
	
	/**
	 * Getting an one-dimensional array with the indexes of 0-cells
	 * @return {array}
	 */
	const getIndexesOfEmptyCells = () => 
		pack.map((num, idx) => (num === 0) ? idx : -1)
			.filter(idx => idx !== -1)
	
	/**
	 * Getting the position for the number to be added
	 */
	const getPostionForNewNumber = () => {
		let options = getIndexesOfEmptyCells()
		return options[getRandomInt(options.length)]
	}
		
	return (
		<div className="board">
			{
				pack.map((num, idx) => <div key={idx}>{num}</div>)
			}
		</div>
	);
}

export default Board;
