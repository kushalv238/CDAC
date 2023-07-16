//The Plane class defines the propperties of a plane
//It needs coordinates and a colour (in 'rgb(a, b, c)' fromat only) as it's parameters
//Plane class has it's own settters and getters for coordinates and colour

import { getRandomColour } from "../../../utils/getRandoms"

class Plane {
	#a
	#b
	#c
	#d
	#colour

	constructor(equation, colour = getRandomColour()) {
		this.#a = equation[0] ? equation[0] : 0;
		this.#b = equation[1] ? equation[1] : 0;
		this.#c = equation[2] ? equation[2] : 0;
		this.#d = equation[3] ? equation[3] : 0;
		this.#colour = colour
	}

	set coordinates(coordinates) {
		this.#a = coordinates.a ? coordinates.a : 0;
		this.#b = coordinates.b ? coordinates.b : 0;
		this.#c = coordinates.c ? coordinates.c : 0;
		this.#d = coordinates.d ? coordinates.d : 0;
	}
	
	set colour(colour) {
		this.#colour = colour
	}

	get coordinates() {
		return {
			a: this.#a,
			b: this.#b,
			c: this.#c,
			d: this.#d
		}
	}
	
	get colour() {
		return {
			colour: this.#colour
		}
	}
}

export default Plane