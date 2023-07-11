import React, { useState } from 'react';

import GraphInfo from './GraphInfo';

class Plane {
	#a
	#b
	#c
	#d

	constructor(equation) {
		this.#a = equation[0] ? equation[0] : 0;
		this.#b = equation[1] ? equation[1] : 0;
		this.#c = equation[2] ? equation[2] : 0;
		this.#d = equation[3] ? equation[3] : 0;
	}

	// getCoordinates() {
	// 	return {
	// 		a: this.#a,
	// 		b: this.#b,
	// 		c: this.#c,
	// 		d: this.#d
	// 	}
	// }

	set coordinates(coordinates) {
		this.#a = coordinates.a ? coordinates.a : 0;
		this.#b = coordinates.b ? coordinates.b : 0;
		this.#c = coordinates.c ? coordinates.c : 0;
		this.#d = coordinates.d ? coordinates.d : 0;
	}

	get coordinates() {
		return {
			a: this.#a,
			b: this.#b,
			c: this.#c,
			d: this.#d
		}
	}
}

// function validatePlaneEquationFormat(equation) {
//   const variablePattern = /([+-]?\d*)([xyz])/gi;
//   const variables = equation.match(variablePattern);

//   return [variables, variables !== null && variables.length >= 2 && !(equation.match(/[^xyz\s+=*-]/gi))];
// }

const PlaneEquationForm = ({ planes, setPlanes }) => {
	// const [planes, setPlanesState] = useState([new Plane([0, 0, 0, 0])]);

	// setPlanes([new Plane([10, 10, 10, 10])]);

	const handleAddPlane = () => {
		setPlanes([...planes, new Plane([0, 0, 0, 0])]);
	};
	
	const handleDeletePlane = (planeIndex) => {
		const updatedPlanes = planes.filter((_, index) => index !== planeIndex);
		setPlanes(updatedPlanes);
		setPlanes(updatedPlanes); // Update the planes in the parent component
	};
	
	const handleInputChange = (planeIndex, coordinates) => {		
		const updatedPlanes = [...planes];
		updatedPlanes[planeIndex].coordinates = coordinates;

		setPlanes(updatedPlanes);
		// extractCoefficients(e.target.value, planeIndex);
	};

	// const extractCoefficients = (equation, planeIndex) => {
	//   const regex = /(-?\d+(\.\d+)?)/g;
	//   const matches = equation.replace(/\s/g, '').match(regex);

	//   if (matches && matches.length === 4 && equation.includes('x') && equation.includes('y') && equation.includes('z') && equation.includes('=')) {
	//     const [a, b, c, d] = matches.map(parseFloat);
	//     const updatedPlanes = [...planes];
	//     updatedPlanes[planeIndex].coefficients = { a, b, c, d };
	//     updatedPlanes[planeIndex].isValid = true;
	//     setPlanesState(updatedPlanes);
	//     setPlanes(updatedPlanes); // Update the planes in the parent component
	//   } else {
	//     const updatedPlanes = [...planes];
	//     updatedPlanes[planeIndex].coefficients = { a: 0, b: 0, c: 0, d: 0 };
	//     updatedPlanes[planeIndex].isValid = false;
	//     setPlanesState(updatedPlanes);
	//     setPlanes(updatedPlanes); // Update the planes in the parent component
	//   }
	// };


	return (
		<div id="side-panel" style={{padding: "0.4rem"}}>
			{
				planes.map(
					(plane, index) => (
						<GraphInfo
							key={index}
							idx={index}
							plane={plane}
							handleDeletePlane={handleDeletePlane}
							handleInputChange={handleInputChange}
						/>
					)
				)
			}
			
			<div>
				<button
					onClick={handleAddPlane}
					style={{
						color: "white",
						padding: "10px 15px",
						border: "none",
						borderRadius: "0.8rem" ,
						backgroundColor: "green",
						cursor: "pointer"
					}}
				>Add Plane</button>
			</div>
		</div>
	);
}

export default PlaneEquationForm;
