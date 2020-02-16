/**
 * Class to help to identify the direction of the user move easily
 */
export class Direction {
	static DIRECTIONS = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	}

	/**
	 * Checking if the value is a valid direction
	 * @param {number} value
	 * @return {boolean}
	 */
	static isDirection(value) {
		return Object.values(this.DIRECTIONS).includes(value)
	}

	/**
	 * Getting the direction of the value
	 * @param {number} value
	 * @return DIRECTION || undefined
	 */
	static getDirectionFor(value) {
		return Object.keys(this.DIRECTIONS).find(key => this.DIRECTIONS[key] === value);
	}
}